import { Listing, User } from "@prisma/client";

export type SafeUser = Omit<User, "createdAt" | "updatedAt" | "emailVerified"> & {
 createdAt: string;
 updatedAt: string;
 emailVerified: string | null
}

export type SafeListSetQuestion = {
 id: string;
 listQuestionName: string;
 questionNumber: number;
}