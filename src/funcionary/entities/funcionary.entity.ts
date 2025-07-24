export class Funcionary {
    id: number;
    cpf: string;
    name: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
    workId?: number;

    // Opcional: relacionamentos
    // work?: Work;
    // equipaments?: Equipment[];
}
