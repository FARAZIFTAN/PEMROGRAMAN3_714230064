package repository

import (
	"context"
	"fmt"
	"inibackend/config"
	"inibackend/model"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

// Initialize database connection
var client *mongo.Client
var db *mongo.Database
var ctx = context.Background()

func init() {
	// Connect to MongoDB
	var err error
	// Get the database directly since MongoConnect already returns it
	db, err = config.MongoConnect(config.DBName)
	if err != nil {
		fmt.Printf("Failed to connect to MongoDB: %v\n", err)
		return
	}
}

func InsertMahasiswa(ctx context.Context, mhs model.Mahasiswa) (insertedID interface{}, err error) {
	// Get collection
	collection := db.Collection(config.MahasiswaCollection)

	// Cek apakah NPM sudah ada
	filter := bson.M{"npm": mhs.NPM}
	count, err := collection.CountDocuments(ctx, filter)
	if err != nil {
		return nil, fmt.Errorf("error checking NPM existence: %v", err)
	}
	if count > 0 {
		return nil, fmt.Errorf("NPM %v sudah terdaftar", mhs.NPM)
	}

	// Insert jika NPM belum ada
	insertResult, err := collection.InsertOne(ctx, mhs)
	if err != nil {
		return nil, fmt.Errorf("error inserting mahasiswa: %v", err)
	}

	return insertResult.InsertedID, nil
}

func GetMahasiswaByNPM(ctx context.Context, npm int) (mhs model.Mahasiswa, err error) {
	// Get collection
	collection := db.Collection(config.MahasiswaCollection)
	filter := bson.M{"npm": npm}
	err = collection.FindOne(ctx, filter).Decode(&mhs)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			return mhs, fmt.Errorf("mahasiswa dengan NPM %v tidak ditemukan", npm)
		}
		return mhs, fmt.Errorf("error finding mahasiswa: %v", err)
	}
	return mhs, nil
}

func GetAllMahasiswa(ctx context.Context) ([]model.Mahasiswa, error) {
	// Get collection
	collection := db.Collection(config.MahasiswaCollection)
	filter := bson.M{}

	cursor, err := collection.Find(ctx, filter)
	if err != nil {
		return nil, fmt.Errorf("error finding all mahasiswa: %v", err)
	}

	var data []model.Mahasiswa
	if err := cursor.All(ctx, &data); err != nil {
		return nil, fmt.Errorf("error decoding mahasiswa: %v", err)
	}

	return data, nil
}

func UpdateMahasiswa(ctx context.Context, npm int, update model.Mahasiswa) (updatedNPM int, err error) {
	// Get collection
	collection := db.Collection(config.MahasiswaCollection)
	filter := bson.M{"npm": npm}
	updateData := bson.M{"$set": update}

	result, err := collection.UpdateOne(ctx, filter, updateData)
	if err != nil {
		return 0, fmt.Errorf("error updating mahasiswa: %v", err)
	}
	if result.ModifiedCount == 0 {
		return 0, fmt.Errorf("tidak ada data yang diupdate untuk NPM %v", npm)
	}
	return npm, nil
}

func DeleteMahasiswa(ctx context.Context, npm int) (deletednpm int, err error) {
	// Get collection
	collection := db.Collection(config.MahasiswaCollection)
	filter := bson.M{"npm": npm}
	result, err := collection.DeleteOne(ctx, filter)
	if err != nil {
		return 0, fmt.Errorf("error deleting mahasiswa: %v", err)
	}
	if result.DeletedCount == 0 {
		return 0, fmt.Errorf("tidak ada data yang dihapus untuk NPM %v", npm)
	}
	return npm, nil
}
