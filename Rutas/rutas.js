const express = require("express");
const ruta = express.Router();

let modeloDatos = require("../Modelo/modelo");
let horarios = require("../Modelo/horarios");
let needle = require("../Modelo/needle");
let needleentr = require("../Modelo/needleentr");
let taskpend = require("../Modelo/taskpend");

ruta.get('/', (req, res) => {
  modeloDatos.find((error, data, next) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

ruta.get('/taskpend', (req, res) => {
  taskpend.find((error, data, next) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

ruta.get('/needleentr', (req, res) => {
  needleentr.find((error, data, next) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

ruta.get('/horarios', (req, res) => {
  horarios.find((error, data, next) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

ruta.get('/needle', (req, res) => {
  needle.find((error, data, next) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

const bcrypt = require("bcrypt");

ruta.post('/taskpend', async (req, res, next) => {

  const ingreso = new taskpend({
    title: req.body.title,
    description: req.body.description,
    completed: req.body.completed,
    prioridad: req.body.prioridad
  })

  taskpend.create(ingreso, (error, data) => {
    if (error) {
      return next(error);
    } else {
      console.log(data);
      res.json(data);
    }
  });
});



ruta.post('/registrar', async (req, res, next) => {

  const emailExiste = await modeloDatos.findOne({ email: req.body.email })
  if (emailExiste) {
    return res.status(400).json({ error: "el usuario ya se encuentra registrado" })
  }
  //const encryp=await bcrypt.genSalt(10);
  const password = await bcrypt.hash(req.body.password, 10);

  const user = new modeloDatos({
    name: req.body.name,
    phone: req.body.phone,
    email: req.body.email,
    password: password
  })

  modeloDatos.create(user, (error, data) => {
    if (error) {
      return next(error);
    } else {
      console.log(data);
      res.json(data);
    }
  });
});

ruta.post('/regneedle', async (req, res, next) => {

  const ingreso = new needle({
    name: req.body.name,
    cod: req.body.cod,
    g09: req.body.g09,
    g05: req.body.g05,
    a75: req.body.a75,
    a76: req.body.a76,
    a06: req.body.a06,
    a09: req.body.a09,
    a12: req.body.a12,
    a16: req.body.a16,
    obs: req.body.obs
  })

  needle.create(ingreso, (error, data) => {
    if (error) {
      return next(error);
    } else {
      console.log(data);
      res.json(data);
    }
  });
});


ruta.post('/regneedleentr', async (req, res, next) => {

  const ingreso = new needleentr({
    g09: req.body.g09,
    g05: req.body.g05,
    a75: req.body.a75,
    a76: req.body.a76,
    a06: req.body.a06,
    a09: req.body.a09,
    a12: req.body.a12,
    a16: req.body.a16,
    obs: req.body.obs
  })

  needleentr.create(ingreso, (error, data) => {
    if (error) {
      return next(error);
    } else {
      console.log(data);
      res.json(data);
    }
  });
});

ruta.get("/edit-needle/:id", (req, res) => {
  needle.findById(req.params.id, (error, data, next) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

ruta.get("/edit-needleentr/:id", (req, res) => {
  needleentr.findById(req.params.id, (error, data, next) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

ruta.get("/edit-taskpend/:id", (req, res) => {
  taskpend.findById(req.params.id, (error, data, next) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});


ruta.put("/update-needle/:id", (req, res, next) => {
  needle.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    (error, data) => {
      if (error) {
        console.log(error);
        return next(error);
      } else {
        res.json(data);
        console.log("Student successfully updated!");
      }
    }
  );
});

ruta.put("/update-needleentr/:id", (req, res, next) => {
  needleentr.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    (error, data) => {
      if (error) {
        console.log(error);
        return next(error);
      } else {
        res.json(data);
        console.log("Student successfully updated!");
      }
    }
  );
});

ruta.put("/update-taskpend/:id", (req, res, next) => {
  taskpend.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    (error, data) => {
      if (error) {
        console.log(error);
        return next(error);
      } else {
        res.json(data);
        console.log("Student successfully updated!");
      }
    }
  );
});




ruta.delete("/delneedle/:id", (req, res, next) => {
  needle.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data,
      });
    }
  });
});

ruta.delete("/delneedleentr/:id", (req, res, next) => {
  needleentr.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data,
      });
    }
  });
});

ruta.delete("/deltaskpend/:id", (req, res, next) => {
  taskpend.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data,
      });
    }
  });
});


const jwt = require("jsonwebtoken")

ruta.post("/login", async (req, res) => {
  const user = await modeloDatos.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).json({
      error: "usuario no esta registrado"
    })
  }

  const validPassword = await bcrypt.compare(req.body.password, user.password)
  if (!validPassword) {
    return res.status(400).json({
      error: "contraseña invalida"
    })
  }

  res.json({
    error: null,
    data: "acceso exitoso"
  })
  const token = jwt.sign({
    email: user.email,
    id: user._id
  }, "claveSecreta")
  res.header("auth-token", token).json({
    error: null,
    data: { token }
  })
})
module.exports = ruta;