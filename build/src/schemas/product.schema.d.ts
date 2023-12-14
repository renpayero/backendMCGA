import { z } from 'zod';
export declare const createProductSchema: z.ZodObject<{
    nombre: z.ZodString;
    precio: z.ZodNumber;
    descripcion: z.ZodString;
    stock: z.ZodNumber;
    categoria: z.ZodString;
}, "strip", z.ZodTypeAny, {
    nombre: string;
    precio: number;
    descripcion: string;
    categoria: string;
    stock: number;
}, {
    nombre: string;
    precio: number;
    descripcion: string;
    categoria: string;
    stock: number;
}>;
