import express from 'express';
import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient()

// async function main() {
//     const allDevices = await prisma.device.findMany()
//     console.log("test")
//     console.log(allDevices)
// }

// main()
//   .then(async () => {
//     await prisma.$disconnect()
//   })
//   .catch(async (e) => {
//     console.error(e)
//     await prisma.$disconnect()
//     process.exit(1)
//   })


const app = express();

const prisma = new PrismaClient();

app.use(express.json());
app.use(express.urlencoded());

// Pages statiques
app.use(express.static("public"));

// Retourne tous les utilisateurs de la base
app.get("/devices", async (req, res) => {
  const allDevices = await prisma.device.findMany();
  res.status(200).json(allDevices);
});

app.post("/new_device", async (req, res) => {
  const {nom, localisation} = req.body;
  const result = await prisma.device.create({
    data:{
      nom: nom,
      localisation: localisation,
    }
  });
  res.json(result);
});

app.get("/device/:id", async (req, res) => {
    const {id} = req.params;

    const device = await prisma.device.findUnique({
      where: { id: Number(id)},
    });
    res.json(device);
  });

app.get("/device/:limit", async (req, res) => {
  const { limit } = req.params;

  const AllDevices = await prisma.device.findMany({
    orderBy: { nom: "asc"},
    take: Number(limit),
    });
    res.json(device);
  });

app.delete("/device_delete/:id", async (req, res) => {
  const {id} = req.params;
  const sup = await prisma.device.delete({
    where: { id: Number(id)},
  });
  res.json(sup);
});

app.put("/update_device/:id", async (req, res) => {
  const { id } = req.params;
  const { nom, localisation } = req.body; 
  const modifier = await prisma.device.update({
    data:{
      nom: nom,
      localisation: localisation,
    },

    where: { id: Number(id)},
  });
  // console.log(id, nom, localisation);
  // res.json(modifier)
});

app.get

// Lancement du serveur
app.listen(8080, () => {
  console.log("Serveur à l'écoute sur le port 8080");
});