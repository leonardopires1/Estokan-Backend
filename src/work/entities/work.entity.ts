export class Work {
    id: number;
    ownerCpf: string;
    title: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;

    // Relacionamentos opcionais
    // owner?: User;
    // functionaries?: Funcionary[];
    // equipaments?: Equipment[];
}
