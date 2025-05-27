/**
 * @typedef {Object} UserProps
 * @property {string} uid
 * @property {string} name
 * @property {string} email
 * @property {string?} [avatarUri]
 * @property {number?} [age]
 * @property {number?} [height]
 * @property {number?} [weight]
 * @property {string?} [phone]
 * @property {'male' | 'female' | null} [gender]
 * @property {'gain' | 'lose' | 'maintain' | null} [goal]
 * @property {'low' | 'medium' | 'high' | null} [activityLevel]
 * @property {string} [createdAt]
 * @property {string} [updatedAt]
 * @exports UserProps 
 * 
 * 
 * @typedef {Object} UserContextProps
 * @property {UserProps | null} user
 * @property {(user: UserProps) => void} setUser
 * 
 * @exports UserContextProps
 */
