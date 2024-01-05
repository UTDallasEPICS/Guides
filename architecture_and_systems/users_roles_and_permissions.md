# Users, Roles, and Permissions

## Organizing user information

For this section we will be using the following schema:

```prisma
model User {
  id        Int      @id @default(autoincrement())
  username  String   @unique
  email     String   @unique
  password  String

  EmployeeProfile EmployeeProfile?  @relation(fields: [employeeProfileId], references: [id])
  employeeProfileId Int?
  CustomerProfile CustomerProfile?  @relation(fields: [customerProfileId], references: [id])
  customerProfileId Int?
}

model EmployeeProfile {
  id        Int      @id @default(autoincrement())
  start_date DateTime @default(now())
  end_date DateTime?

  Role      Role     @relation(fields: [roleId], references: [id])
  roleId    Int
  User User  @relation(fields: [userId], references: [id])
  userId Int?
}

model CustomerProfile {
  id        Int      @id @default(autoincrement())
  birth_date DateTime @default(now())

  User User  @relation(fields: [userId], references: [id])
  userId Int?
}

model Role {
  id       Int     @id @default(autoincrement())
  name     String  @unique
  title     String  @unique

  users    User[]
}

```

We use one user table to handle all logins. This makes login and authentication checking very straightforward. To identify what kind of user a user is, we can check if it possesses a profile.

```js
const email = "example@example.com";
const user = await prisma.user.findFirst({
  where: { email },
  include: {
    CustomerProfile: true,
    EmployeeProfile: true,
  },
});
if (user.EmployeeProfile) {
  // user is an employee
}
if (user.CustomerProfile) {
  // user is a customer
}
```

Note that our `Role` table is connected to the `EmployeeProfile` table, not the `User` table. This because not all Users have roles, but all Employees have roles. If all users had roles, we could put the relationship on the `User` table, but it's likely Customers and Employees would have different types of roles conceptually, and we might want to keep those defined separately as CustomerRoles and EmployeeRoles anyways.

To check that a User is an Employee and is an Admin, we can do the following:

```js
const email = "example@example.com";
const user = await prisma.user.findFirst({
  where: { email },
  include: {
    CustomerProfile: true,
    EmployeeProfile: true,
  },
});
if (user.EmployeeProfile && user.EmployeeProfile.name == "admin") {
  return `User is an Admin`;
}
return `User is not an Admin`;
```

In this example, there is only one store and all users belong to it. If we have to track multiple stores, we could theoretically have Employees and Customers that have different roles at different stores. We would then have a join table in our schema like so:

```prisma
model Store {
  id Int @default(autoincrement())
  name String
  UserToStore UserToStore[]
}
model UserToStore {
  id Int @default(autoincrement())
  start_date DateTime @default(now())
  end_date DateTime?

  User User @relation(fields: [userId], references: [id])
  userId Int
  Store Store @relation(fields: [storeId], references: [id])
  storeId Int
  Role Role @relation(fields:[roleId], references: [id])
  roleId Int

  @@unique([userId, storeId, roleId])
}
```

The information about a User's role is now dependent on which Store the User is at, because it is on the table for the **relationship** between a User and a Store. Also note that there can only be one entry in the database for a combination of `userId`, `storeId`, and `roleId`.

The previous examples use role based permissions, where having a role automatically grants a user a large swathe of permissions. Alternatively we can assign permissions granularly, where each user can have a completely customized level of access. We can model this like so:

```prisma
model UserToStore{
  id Int @id @default(autoincrement())
  start_date DateTime @default(now())
  end_date DateTime?
  // each specific possible operation has its own permissions flag
  can_open_registers Boolean @default(false)
  can_receive_shipments Boolean @default(false)
  can_process_refunds Boolean @default(false)

  User User @relation(fields: [userId], references: [id])
  userId Int
  Store Store @relation(fields: [storeId], references: [id])
  storeId Int
}

```
