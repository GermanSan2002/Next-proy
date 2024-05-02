import { conn } from "@/libs/mysql";
import { NextResponse } from "next/server";

export async function GET(request, { params }){
    try{
        const res = await conn.query("SELECT * FROM product WHERE id = ?", [params.id,])

        if (res.length === 0) {
            return NextResponse.json(
                {
                    message: "Producto no encontrado",
                },
                {
                    status: 404,
                }
            );
        }

        return NextResponse.json(res[0]);
    }catch(error){
        return NextResponse.json(
            {
                message: error.message,
            },
            { status: 500 }
        );
    }
}

export async function DELETE(request, { params }) {
    try {
        const result = await conn.query("DELETE FROM product WHERE id = ?", [
            params.id,
        ]);

        if (result.affectedRows === 0) {
            return NextResponse.json(
                {
                    message: "Producto no encontrado",
                },
                {
                    status: 404,
                }
            );
        }

        return new Response(null, {
            status: 204,
        });
    } catch (error) {
        return NextResponse.json(
            {
                message: error.message,
            },
            { status: 500 }
        );
    }
}

export async function PUT(request, { params }) {
    try {
        const data = await request.json();
        const res = await conn.query("UPDATE product SET ? WHERE id=?", [
            data,
            params.id,
        ])
        
        if(res.affectedRows === 0){
            return NextResponse.json(
            {
                message: "Prioducto no encontrado"
            },
            {
                status: 404
            })
        }

        const updated = await conn.query("SELECT * FROM product WHERE id = ?", [params.id,])

        return NextResponse.json(updated[0])

    } catch (error) {
        console.log(error);
        return NextResponse.json(
            {
                message: error.message,
            },
            { status: 500 }
        );
    }
}