import { createContext } from "react";

/**
 * default value of the user context is an empty object
 * an initialized user's shape would be {id, email, username, role, token}
 */

export const NotificationContext = createContext(undefined);
