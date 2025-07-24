import { TypeEquipament, statusEquipament } from '@prisma/client';

export class Equipament {
    id: number;
    name: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    supplierId: number | null;
    functionaryId: number | null;
    workId: number | null;
    type: TypeEquipament;
    status: statusEquipament;

    // Relacionamentos opcionais
    // supplier?: Supplier;
    // functionary?: Funcionary;
    // work?: Work;
}
