export class Supplier {
    id: number;
    cnpj: string;
    name: string;
    email: string;
    password: string;
    location: string;
    createdAt: Date;
    updatedAt: Date;

    // Relacionamentos opcionais
    // equipaments?: equipament[];
}
