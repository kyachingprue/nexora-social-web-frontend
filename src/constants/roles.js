// ==========================================
// User Roles
// ==========================================

export const ROLES = {
  USER: 'user',
  ADMIN: 'admin'
}

// ==========================================
// Role Labels
// ==========================================

export const ROLE_LABELS = {
  [ROLES.USER]: 'User',
  [ROLES.ADMIN]: 'Administrator'
}

// ==========================================
// Role Permissions
// ==========================================

export const ROLE_PERMISSIONS = {
  [ROLES.USER]: [
    'read_profile',
    'update_profile',
    'create_post',
    'update_own_post',
    'delete_own_post',
    'create_comment',
    'update_own_comment',
    'delete_own_comment',
    'like_post',
    'save_post',
    'share_post',
    'follow_user',
    'send_message',
    'view_notifications'
  ],

  [ROLES.ADMIN]: [
    'read_profile',
    'update_profile',
    'create_post',
    'update_own_post',
    'delete_own_post',
    'create_comment',
    'update_own_comment',
    'delete_own_comment',
    'like_post',
    'save_post',
    'share_post',
    'follow_user',
    'send_message',
    'view_notifications',

    // Admin permissions
    'view_admin_dashboard',
    'manage_users',
    'view_user_details',
    'update_users',
    'suspend_users',
    'activate_users',
    'delete_users',
    'manage_posts',
    'delete_any_post',
    'hide_any_post',
    'view_reports',
    'manage_reports',
    'view_analytics',
    'manage_admin_settings'
  ]
}

// ==========================================
// Check User Role
// ==========================================

export const hasRole = (user, role) => {
  if (!user || !role) return false

  return user.role === role
}

// ==========================================
// Check Admin Role
// ==========================================

export const isAdmin = user => {
  return hasRole(user, ROLES.ADMIN)
}

// ==========================================
// Check Regular User Role
// ==========================================

export const isUser = user => {
  return hasRole(user, ROLES.USER)
}

// ==========================================
// Check Permission
// ==========================================

export const hasPermission = (user, permission) => {
  if (!user || !permission) return false

  const role = user.role

  if (!role || !ROLE_PERMISSIONS[role]) {
    return false
  }

  return ROLE_PERMISSIONS[role].includes(permission)
}

// ==========================================
// Check Multiple Permissions
// ==========================================

export const hasAnyPermission = (
  user,
  permissions = []
) => {
  if (!user || !Array.isArray(permissions)) {
    return false
  }

  return permissions.some(permission =>
    hasPermission(user, permission)
  )
}

export const hasAllPermissions = (
  user,
  permissions = []
) => {
  if (!user || !Array.isArray(permissions)) {
    return false
  }

  return permissions.every(permission =>
    hasPermission(user, permission)
  )
}

// ==========================================
// Get Role Permissions
// ==========================================

export const getRolePermissions = role => {
  return ROLE_PERMISSIONS[role] || []
}

// ==========================================
// Valid Roles
// ==========================================

export const VALID_ROLES = Object.values(ROLES)

export default ROLES

