// Permission definitions and utility functions for RBAC

export const PERMISSIONS = {
    DASHBOARD: {
        VIEW: "dashboard.view",
    },
    USERS: {
        VIEW: "users.view",
        CREATE: "users.create",
        EDIT: "users.edit",
        DELETE: "users.delete",
    },
    USER_TYPES: {
        VIEW: "user-types.view",
        CREATE: "user-types.create",
        EDIT: "user-types.edit",
        DELETE: "user-types.delete",
    },
    BLOGS: {
        VIEW: "blogs.view",
        CREATE: "blogs.create",
        EDIT: "blogs.edit",
        DELETE: "blogs.delete",
    },
    CASE_STUDIES: {
        VIEW: "case-studies.view",
        CREATE: "case-studies.create",
        EDIT: "case-studies.edit",
        DELETE: "case-studies.delete",
    },
} as const;

// Get all permissions as a flat array
export const ALL_PERMISSIONS = Object.values(PERMISSIONS).flatMap((category) =>
    Object.values(category)
);

// Permission groups for common roles
export const PERMISSION_GROUPS = {
    ADMIN: ALL_PERMISSIONS,
    EDITOR: [
        PERMISSIONS.DASHBOARD.VIEW,
        PERMISSIONS.BLOGS.VIEW,
        PERMISSIONS.BLOGS.CREATE,
        PERMISSIONS.BLOGS.EDIT,
        PERMISSIONS.BLOGS.DELETE,
        PERMISSIONS.CASE_STUDIES.VIEW,
        PERMISSIONS.CASE_STUDIES.CREATE,
        PERMISSIONS.CASE_STUDIES.EDIT,
        PERMISSIONS.CASE_STUDIES.DELETE,
    ],
    VIEWER: [
        PERMISSIONS.DASHBOARD.VIEW,
        PERMISSIONS.USERS.VIEW,
        PERMISSIONS.USER_TYPES.VIEW,
        PERMISSIONS.BLOGS.VIEW,
        PERMISSIONS.CASE_STUDIES.VIEW,
    ],
};

/**
 * Check if user has a specific permission or any of the permissions in an array
 */
export function hasPermission(
    userPermissions: string[],
    required: string | string[]
): boolean {
    if (!userPermissions || userPermissions.length === 0) {
        return false;
    }

    if (Array.isArray(required)) {
        return required.some((perm) => userPermissions.includes(perm));
    }

    return userPermissions.includes(required);
}

/**
 * Check if user has all of the specified permissions
 */
export function hasAllPermissions(
    userPermissions: string[],
    required: string[]
): boolean {
    if (!userPermissions || userPermissions.length === 0) {
        return false;
    }

    return required.every((perm) => userPermissions.includes(perm));
}

/**
 * Throw error if user doesn't have required permission
 */
export function requirePermission(
    userPermissions: string[] | undefined,
    permission: string | string[]
): void {
    if (!userPermissions) {
        throw new Error("Unauthorized: No permissions");
    }

    if (!hasPermission(userPermissions, permission)) {
        const permStr = Array.isArray(permission)
            ? permission.join(" or ")
            : permission;
        throw new Error(`Unauthorized: Missing permission ${permStr}`);
    }
}

/**
 * Get permission category and action from a permission string
 * e.g., "users.view" => { category: "users", action: "view" }
 */
export function parsePermission(permission: string): {
    category: string;
    action: string;
} {
    const [category, action] = permission.split(".");
    return { category, action };
}
