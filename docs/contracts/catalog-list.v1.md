# API รายการสินค้า
สถานะ: PROPOSED
รุ่น: v1
เจ้าของข้อเสนอ: Microservice

คำขอ: GET /api/v1/catalog/products
Request body: ไม่ส่ง
Query: available เลือกใส่ได้ รับ true หรือ false


คำขอ: GET /api/v1/catalog/products
Request body: {
  "data": [
    { "id": "notebook", "name": "สมุดบันทึก", "priceSatang": 12900, "available": true },
    { "id": "pen", "name": "ปากกาสีน้ำเงิน", "priceSatang": 2500, "available": false },
    { "id": "pencil", "name": "ดินสอ", "priceSatang": 1200, "available": true },
    { "id": "ruler", "name": "ไม้บรรทัด", "priceSatang": 2000, "available": false },
    { "id": "eraser", "name": "ยางลบ", "priceSatang": 800, "available": true },
    { "id": "sharpener", "name": "กบเหลาดินสอ", "priceSatang": 1500, "available": false }
  ]
}
Query: ไม่ใส่ available 

คำขอ: GET /api/v1/catalog/products?available=false
Request body: {
  "data": [
    { "id": "pen", "name": "ปากกาสีน้ำเงิน", "priceSatang": 2500, "available": false },
    { "id": "ruler", "name": "ไม้บรรทัด", "priceSatang": 2000, "available": false },
    { "id": "sharpener", "name": "กบเหลาดินสอ", "priceSatang": 1500, "available": false }
  ]
}
Query: available=false


คำขอ: GET /api/v1/catalog/products?available=true
Request body: {
  "data": [
    { "id": "notebook", "name": "สมุดบันทึก", "priceSatang": 12900, "available": true },
    { "id": "pencil", "name": "ดินสอ", "priceSatang": 1200, "available": true },
    { "id": "eraser", "name": "ยางลบ", "priceSatang": 800, "available": true },
  ]
}
Query: available=true