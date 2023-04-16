import { Session } from "next-auth";
import { SessionContextValue } from "next-auth/react";

export const isConnected = (session: SessionContextValue) => {
    return session.data && session.status == "authenticated"
}