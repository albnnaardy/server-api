import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default async (req, res) => {
  if (req.method === 'POST') {
    const { email, password } = req.body
    // Lakukan validasi dan autentikasi
    const user = await prisma.users.findUnique({
      where: { email }
    })
    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }
    // Buat token atau session sesuai kebutuhan
    return res.status(200).json({ message: 'Login berhasil', user })
  } else {
    res.setHeader('Allow', ['POST'])
    return res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
