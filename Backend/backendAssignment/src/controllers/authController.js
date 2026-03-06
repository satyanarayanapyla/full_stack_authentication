import express from "express"
import { pool } from "../db";
import { hashedPassword } from "../utils/hash";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/jwt";
export const registerUser = async (req, res) => {
    try {
        const { first_name, last_name, email, mobile_number, password } = req.body;
        const userExists = await pool.query(
            "SELECT * FROM users where email=$1", [email]
        )
        if (userExists.rows.length > 0) {
            return res.status(409).json({ message: "Email already registered", status: false });
        }
        const hashpassword = await hashedPassword(password)
        await pool.query(
            "INSERT INTO users (first_name, last_name, email, mobile_number, password) VALUES ($1,$2,$3,$4,$5)", [first_name, last_name, email, mobile_number, hashpassword]
        )
        res.status(201).json({ message: "User registered successfully", status: true });
    } catch (err) {
        console.log(err.message)
        res.json({ status: 500, "message": "Server Error" })
    }
}

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const result = await pool.query(
            "SELECT * FROM users where email=$1", [email]
        )
        if (result.rows.length === 0) {
            return res.status(401).json({ message: "Invalid credentials", status: false });
        }
        const user = result.rows[0];
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials", status: false });
        }
        const token = generateToken({
            id: user.id,
            email: user.email,
        })
        res.status(200).json({
            status: true,
            message: "Login successful",
            accessToken: token,
            email: user.email,
        });
    } catch (err) {
        console.error("Register Error:", err.message);
        res.status(500).json({ message: "Server error", status: false });
    }

}