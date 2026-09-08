# Databases

## SQL

SQL (Structured Query Language) databases, such as MySQL and PostgreSQL (often referred to as Postgres), are widely used for managing and organizing large amounts of data. SQL is a standardized language used to communicate with these databases.

At a high level, SQL databases consist of tables that store data in a structured manner. Each table is made up of rows and columns, where each row represents a record and each column represents a specific attribute or field of that record. For example, in a database of employees, a table might have columns for employee ID, name, age, and department.

SQL provides a set of commands, also known as queries, to interact with the database. These queries can be used to create, retrieve, update, and delete data. Here are a few examples:

### Creating a table:

```sql
CREATE TABLE Employees (
 ID INT PRIMARY KEY,
 Name VARCHAR(50),
 Age INT,
 Department VARCHAR(50)
);
```

### Inserting data into a table:

```sql
INSERT INTO Employees (ID, Name, Age, Department)
VALUES (1, 'John Doe', 25, 'Sales');
```

### Retrieving data from a table:

```sql
SELECT * FROM Employees;
```

### Updating data in a table:

```sql
UPDATE Employees SET Age = 26 WHERE ID = 1;
```

### Deleting data from a table:

```sql
DELETE FROM Employees WHERE ID = 1;
```

## PostgreSQL & MySQL

These are two of the most popular SQL databases. They both use SQL, with some minor differences. For most real world business applications (in terms of number of businesses, not annual revenues - most businesses are not Google and don't have Google sized problems), they are largely interchangeable. For some applications, PostgreSQL dominates MySQL in terms of extensibility and flexibility. PostgreSQL supports the installation of extensions, such as pg_vector which adds support for vector searching or postgresml which adds support for running machine learning directly in the database.

## MongoDB

MongoDB is a popular NoSQL database that differs from traditional SQL databases in its approach to data storage and retrieval. It is designed to handle large-scale, unstructured, and semi-structured data, making it well-suited for certain types of applications.

MongoDB stores data in flexible, JSON-like documents, known as BSON (Binary JSON). These documents can have varying structures, allowing for dynamic schema and easy scalability. Instead of using tables and rows like SQL databases, MongoDB organizes data into collections of documents.

MongoDB and NoSQL generally were designed for a very specific set of problems faced by hyperscalers such as Meta and Google. The vast majority of business applications benefit more from the relational model and ease of accessibility to the business people. Business people that are involved in analytics know SQL, which is designed to be close to natural language. They probably don't know Javascript. SQL is easier for laypeople to read than the code needed to achieve similar results with MongoDB. Business people are the ones who know how the money works, it's a good idea to be able to work well with them. It's also easier to write custom queries in SQL if you need to work directly with the database.

Additionally, the lack of a fixed schema in MongoDB means that the complexity of guaranteeing data structures moves from the database to being managed by the developer in code. You still need and end up with a schema, you just have to do more work for it. Note that with SQL, you can still use an ORM to get an interface that works better with code, such as Prisma or Drizzle (for the JS ecosystem), so using an SQL database gets you the best of both worlds.

Both NoSQL and SQL ultimately ended up integrating a lot of each others features. MongoDB implemented better support for a lot of SQL features, and SQL systems integrated better horizontal scaling and sharding support.

> This is Taz speaking direct from personal experience. I used MongoDB for my very first EPICS project back in 2016, a data dashboard for TexProtects, and had to write data aggregation queries using MongoDBs JS library.

> Version 2 used Postgres.

An SQL analytics query:

```sql
SELECT Customers.CustomerID, Customers.CustomerName, SUM(Orders.TotalAmount) AS TotalSales
FROM Customers
INNER JOIN Orders ON Customers.CustomerID = Orders.CustomerID
WHERE Orders.OrderDate >= '2022-01-01' AND Orders.OrderDate <= '2022-12-31'
GROUP BY Customers.CustomerID, Customers.CustomerName
ORDER BY TotalSales DESC
LIMIT 10;

```

The same query using MongoDB:

```js
const customersCollection = db.collection("customers");
const ordersCollection = db.collection("orders");

const results = customersCollection.aggregate([
  {
    $lookup: {
      from: "orders",
      localField: "CustomerID",
      foreignField: "CustomerID",
      as: "orders",
    },
  },
  {
    $unwind: "$orders",
  },
  {
    $match: {
      "orders.OrderDate": {
        $gte: new Date("2022-01-01"),
        $lte: new Date("2022-12-31"),
      },
    },
  },
  {
    $group: {
      _id: {
        CustomerID: "$CustomerID",
        CustomerName: "$CustomerName",
      },
      TotalSales: { $sum: "$orders.TotalAmount" },
    },
  },
  {
    $sort: { TotalSales: -1 },
  },
  {
    $limit: 10,
  },
]);

results.toArray((err, docs) => {
  if (err) {
    console.error(err);
  } else {
    console.log(docs);
  }
});
```

Prisma (an ORM for JavaScript that supports many databases, including MySQL, PostgreSQL, and MongoDB):

```js
const customers = await prisma.customer.findMany({
  select: {
    CustomerID: true,
    CustomerName: true,
    TotalSales: {
      sum: {
        select: {
          TotalAmount: true,
        },
      },
    },
  },
  where: {
    orders: {
      some: {
        OrderDate: {
          gte: new Date("2022-01-01"),
          lte: new Date("2022-12-31"),
        },
      },
    },
  },
  orderBy: {
    TotalSales: "desc",
  },
  take: 10,
});
console.log(customers);
```

The SQL query is much easier for non-software people to read and understand, because it reads like English, with verbs and nouns and a grammatical structure. SQL plus an ORM like Prisma enables you to speak engineering while the business people speak SQL. MongoDB enables you to speak engineering and your business people to be confused. You can however use MongoDB for other applications such as caching, where the business people are unlikely to touch it and speed dominates all other concerns.

## Redis

However, for many cases there are also better solutions than NoSQL for caching. One of these is Redis, an in-memory database that read/writes from RAM instead of storage.

> Another side note from Taz. It's important to understand how computer hardware and networking work. You can do anything in software, but how well it performs in the real world is dependent upon the hardware you are running on. You don't need to know how to fabricate a chip, but you do need to know the difference between and implications of storage vs RAM; networking connectivity such as Ethernet, WiFi, and 5G; how processors handle multitasking; local vs cloud vs edge; protocols like HTTPS, SSH, and IP.

> For this section, all you need to know is that reading from storage is slow and reading from RAM is fast. In most cases these days storage is an SSD (solid state drive), in some cases still platter drives (spinning disks with read/write heads), and in some very specific cases even magnetic tape drives (like VHS tapes but the size of washing machines).

Because Redis read/writes from memory, it is very, very, very fast. However, memory space costs significantly more than storage and RAM is technically ephemeral storage, meaning that data is not persisted to disk by default (if the machine turns off, data is lost). This means Redis is best for applications where you need very high throughput for relatively little data that doesn't require persistence guarantees, such as caching user sessions. You probably won't need this for an EPICS project but you will definitely run into it and its siblings (such as Memcached) in your career.

## Using Docker

For local development, Docker makes it convenient to have multiple databases running with total isolation from each other. All databases have a Docker image that you can configure and run. This is easier for Linux and Mac users - Windows requires a bit more work to add the Windows Subsystem for Linux. Microsoft realized they sucked at making an operating system for software engineering and admitted that they needed Linux in their lives, so they added support for running the Linux kernel without having to dualboot or use a virtual machine. For example, see the [PostgreSQL image on Docker Hub](https://hub.docker.com/_/postgres/).
