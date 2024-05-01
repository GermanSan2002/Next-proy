import { conn } from "@/libs/mysql";
import { NextResponse } from "next/server";
import validator from "validator";


export async function GET() {
    try {
        const res = await conn.query("SELECT * FROM product")
        return NextResponse.json(res);
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            {
                message: error.message,
            },
            {
                status: 500,
            }
        );
    }
}

export async function POST(request) {
    try {
        const {name, description, price} = await request.json();

        if (validator.isEmpty(name) || name === null) {
            return NextResponse.json(
              {
                message: "Name is required",
              },
              {
                status: 400,
              }
            );
        }

        const res = await conn.query("INSERT INTO product SET ?", 
        { 
            name,
            description,
            price
        })
        
        return NextResponse.json({
            name,
            description,
            price,
            id: res.insertId,
        });
    } catch (error) {
        return NextResponse.json(
            {
                message: error.message,
            },
            {
                status: 500,
            }
        );
    }
}