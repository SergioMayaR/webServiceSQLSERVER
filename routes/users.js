let sql = require('mssql');
let express = require('express');
let app = express.Router()

//Initiallising connection string
var dbConfig = {
    user: 'Ptreesys',
    password: 'Ptree2021',
    server: 'DESKTOP-L35P213',
    database: 'test',
    port: 1433
};

//GET API
app.get('/', (req, res) => {
    sql.connect(dbConfig, () => {
        var request = new sql.Request();
        request.query('SELECT * FROM dbo.empleoyes', (err, recordsets) => {
            if (err) { throw err };
            res.setHeader('Content-Type', 'application/json');
            sql.close();
            return res.send({ users: recordsets.recordset }); // Result in JSON format
        });
    });
});

app.get('/:id', (req, res) => {
    sql.connect(dbConfig, () => {
        var request = new sql.Request();
        var stringRequest = 'SELECT * FROM dbo.empleoyes WHERE id = ' + req.params.id;
        request.query(stringRequest, (err, recordset) => {
            if (err) { throw err };
            res.setHeader('Content-Type', 'application/json');
            sql.close();
            return res.send({ user: recordset.recordset[0] }); // Result in JSON format
        });
    });
});

//POST API
app.post("/", (req, res) => {
    sql.connect(dbConfig, () => {
        var transaction = new sql.Transaction();
        transaction.begin(() => {
            console.log("ACA")
            var request = new sql.Request(transaction);
            let name = req.body.nombre;
            let salary = req.body.salario;
            request.input("nombre", sql.VarChar(30), name)
            request.input("salario", sql.Int(), salary)
            request.query('insert into dbo.empleoyes (nombre,salario) values (@nombre,@salario)', (err, result) => {
                transaction.commit()
                    .then(() => {
                        sql.close();
                        res.setHeader('Content-Type', 'application/json');
                        return res.status(200).send({ result: 'Data added successfully', data: req.body })
                    })
                    .catch((err) => {
                        sql.close();
                        res.setHeader('Content-Type', 'application/json');
                        return res.status(400).send({ result: "Error while inserting data", error: err });
                    });
            })
        });
    });
});

//PUT API
app.put("/:id", function(req, res) {
    sql.connect(dbConfig, () => {
        var transaction = new sql.Transaction();
        transaction.begin(() => {
            console.log("ACA")
            var request = new sql.Request(transaction);
            let name = req.body.nombre;
            let salary = req.body.salario;
            let id = req.body.id;
            request.input("nombre", sql.VarChar(30), name)
            request.input("salario", sql.Int(), salary)
            request.input("salario", sql.Int(), 1900)
            request.input("id", sql.Int(), id)
            console.log("ACA antes de entrar")
            request.query('UPDATE empleoyes SET nombre= @nombre, salario= @salario  WHERE id = @id', (err, result) => {
                console.log(err)
                console.log(result)
                transaction.commit()
                    .then(() => {
                        sql.close();
                        res.setHeader('Content-Type', 'application/json');
                        return res.status(200).send({ result: 'Data updated successfully', data: req.body })
                    })
                    .catch((err) => {
                        sql.close();
                        res.setHeader('Content-Type', 'application/json');
                        return res.status(400).send({ result: "Error while updating data", error: err });
                    });
            })
        });
    });
});

// DELETE API
app.delete("/:id", (req, res) => {
    var query = "DELETE FROM dbo.users WHERE id =" + req.params.id;
    sql.connect(dbConfig, () => {
        var request = new sql.Request();
        request.query(query, (err) => {
            if (err) { throw err };
            res.setHeader('Content-Type', 'application/json');
            sql.close();
            return res.send({ result: 'Record deleted successfully' }); // Result in JSON format
        });
    });
});

module.exports = app;