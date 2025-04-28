package router

import (
	"inibackend/handler"

	"github.com/gofiber/fiber/v2"
)

func SetupRoutes(app *fiber.App) {
	api := app.Group("/api")

	api.Get("/", handler.Homepage)
	api.Get("/mhs", handler.GetAllMahasiswa)
	api.Get("/mhs/:npm", handler.GetMahasiswaByNPM)
	api.Post("/mhs", handler.CreateMahasiswa)
	api.Put("/mhs/:npm", handler.UpdateMahasiswa)
	api.Delete("/mhs/:npm", handler.DeleteMahasiswa)
}
