"use server"
import { Pool } from "pg";
import conn from "./db";
import { v4 as uuidv4 } from 'uuid';
import { cookies } from "next/headers";

type SignInAns = {
    isUser: boolean
    otpID?: string
    error?: string
}
type SignInOtpAns = {
    isAuth: boolean
    error?: string
    session?: string
}
type SignUpOtpAns = {
    success: boolean
    error?: string
    session?: string
}
type SignUpAns = {
    success: boolean,
    error?: string
    otpID?: string
}

export const SignInUser = async (email: string, password: string) => {
    try {
        const query = `SELECT * FROM users WHERE email = $1 AND password = $2`;
        const result = await (conn as Pool).query(query, [email, password]);
        
        if(result.rows.length < 1) {
            const ans: SignInAns = {
                isUser: false,
            }
            return ans
        }

        const key = uuidv4()

        const saveKey = await saveOTP(result.rows[0].id, key, "SignInUser")

        if(!saveKey) {
            const ans: SignInAns = {
                isUser: false,
                error: 'Something wants wrong'
            }
    
            return ans
        }
        
        const ans: SignInAns = {
            isUser: true,
            otpID: key
        }

        return ans

    } catch (error) {
        console.log(error);
        
        const ans: SignInAns = {
            isUser: false,
            error: 'Something wants wrong'
        }

        return ans
    }
}

export const SignUpUser = async (email: string, password: string) => {
    try {
        const query = `SELECT * FROM users WHERE email = $1 AND password = $2`;
        const result = await (conn as Pool).query(query, [email, password]);
        
        if(result.rows.length > 0) {
            const ans: SignUpAns = {
                success: false,
                error: "Email is arleady taken"
            }
            return ans
        }

        const key = uuidv4()

        const saveKey = await saveOTP(0, key, "SignInUser")

        if(!saveKey) {
            const ans: SignUpAns = {
                success: false,
                error: 'Something wants wrong'
            }
    
            return ans
        }

        const ans: SignUpAns = {
            success: true,
            otpID: key
        }

        return ans

    } catch (error) {
        console.log(error);
        const ans: SignUpAns = {
            success: false,
            error: 'Something wants wrong'
        }

        return ans
    }
}

const saveOTP = async (userid: number, key: string, action: string) => {

    const generateSixDigitCode = () => {
        return Math.floor(100000 + Math.random() * 900000);
    };

    try {
        const OTPcode = 111111
        const query = `INSERT INTO otps (userid, key, action, otpcode) VALUES ($1, $2, $3, $4)`;
        const result = await (conn as Pool).query(query, [userid, key, action, OTPcode]);
        return true
    } catch (error) {
        return false
    }
}

const getOTP = async (key: string) => {
    try {
        const query = `SELECT * FROM otps WHERE key = $1`;
        const result = await (conn as Pool).query(query, [key]);
        return result.rows.length < 1 ? false : result.rows[0]
    } catch (error) {
        return false
    }
}

export const SignInUserOTP = async (otpcode: number, otpkey: string) => {
    try {
        const OTP = await getOTP(otpkey)
        if(!OTP) {
            
            const ans: SignInOtpAns = {
                isAuth: false,
                error: "OTP code expired"
            }

            return ans
        }
        
        if(otpcode != OTP.otpcode) {
            const ans: SignInOtpAns = {
                isAuth: false,
                error: "Incorrect OTP code"
            }

            return ans
        }

        const session = await createSession(OTP.userid)

        if(!session) {
            const ans: SignInOtpAns = {
                isAuth: false,
                error: "Something wants wrong"
            }

            return ans
        }

        const ans: SignInOtpAns = {
            isAuth: true,
            session: session
        }

        return ans

    } catch (error) {
        const ans: SignInOtpAns = {
            isAuth: false,
            error: "Something wants wrong"
        }

        return ans
    }
}

export const SignUpUserOTP = async (otpcode: number, otpkey: string, email: string, password: string) => {
    try {
        
        const query = `SELECT * FROM users WHERE email = $1 AND password = $2`;
        const result = await (conn as Pool).query(query, [email, password]);
        
        if(result.rows.length > 0) {
            const ans: SignUpOtpAns = {
                success: false,
                error: "Email is arleady taken"
            }
            return ans
        }

        const OTP = await getOTP(otpkey)
        if(!OTP) {
            
            const ans: SignUpOtpAns = {
                success: false,
                error: "OTP code expired"
            }

            return ans
        }
        
        if(otpcode != OTP.otpcode) {
            const ans: SignUpOtpAns = {
                success: false,
                error: "Incorrect OTP code"
            }

            return ans
        }

        const createAcc = await createUser(email, password)

        if(!createAcc) {
            const ans: SignUpOtpAns = {
                success: false,
                error: "Something wants wrong"
            }

            return ans
        }

        const session = await createSession(createAcc)

        if(!session) {
            const ans: SignUpOtpAns = {
                success: false,
                error: "Something wants wrong"
            }

            return ans
        }

        const ans: SignUpOtpAns = {
            success: true,
            session: session
        }

        return ans

    } catch (error) {
        const ans: SignUpOtpAns = {
            success: false,
            error: "Something wants wrong"
        }

        return ans
    }
}

export const createSession = async (userid: number) => {
    try {
        const key = uuidv4()
        const query = `INSERT INTO sessions (userid, key) VALUES ($1, $2)`;
        const result = await (conn as Pool).query(query, [userid, key]);
        return key
    } catch (error) {
        console.log(error)
        return false   
    }
}

export const createUser = async (email: string, password: string) => {
    try {
        const query = `INSERT INTO users (email, password) VALUES ($1, $2)`;
        const result = await (conn as Pool).query(query, [email, password]);
        const getIdQuery = `SELECT * FROM users WHERE email = $1 AND password = $2`
        const getIdResult = await (conn as Pool).query(getIdQuery, [email, password]);
        return getIdResult.rows[0].id
    } catch (error) {
        console.log(error)
        return false
    }
}

export type User = {
    id: number
    email: string
}

export const getUser = async () => {
    try {
        const cookie = await cookies()
        const session = cookie.get('session')
        const query = `SELECT * FROM sessions WHERE key = $1`;
        const result = await (conn as Pool).query(query, [session?.value]);
        if(!result.rows[0]) {
            return null
        }

        const queryUser = `SELECT * FROM users WHERE id = $1`;
        const resultUser = await (conn as Pool).query(queryUser, [result.rows[0].userid]);

        const user: User = {
            id: resultUser.rows[0].id,
            email: resultUser.rows[0].email
        }
        
        return user

    } catch (error) {
        return null
    }
}