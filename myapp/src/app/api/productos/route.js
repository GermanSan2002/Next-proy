import { conn } from "@/libs/mysql";
import { NextResponse } from "next/server";
import validator from "validator";


export async function GET() {
    try {
        const res = await conn.query("SELECT * FROM product")
        return NextResponse.json(results);
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
        const data = await request.formData();

        if (!data.get("name")) {
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
            name: data.get("name"),
            description: data.get("description"),
            price: data.get("price")
        })
        
        return NextResponse.json({
            name: data.get("name"),
            description: data.get("description"),
            price: data.get("price"),
            id: result.insertId,
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