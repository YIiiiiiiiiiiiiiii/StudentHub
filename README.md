# StudentHub

## 安裝與執行
### 下載Docker & mongoDB

- [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- [MongoDB](https://www.mongodb.com/zh-cn)

### clone前後端範例

- [前端](https://github.com/ETHCI-Lab/react-ts-mid)
```
git clone https://github.com/ETHCI-Lab/react-ts-mid
```
- [後端](https://github.com/ETHCI-Lab/mongoDemo)
```
git clone https://github.com/ETHCI-Lab/mongoDemo
```
## 前端

- `frontend`目錄下複製`.env.example`到`.env`並將內容設置成符合自身設定  

本地運行:  
```
cd frontend
npm install
npm run dev
```
## 後端

- `backend`目錄下複製`.env.example`到`.env`並將內容設置成符合自身設定

`運行`
```
npm run dev
```
- 運行後在`orm\schemas`內的`studentSchemas`會對應著MongoDB connections

<img src= "code.png" width="300"  alt="">
<img src= "MongoDB students.png" width="300" alt="">

### 資料庫

設置 MongoDB , DB , Collection , 指定 Collection name : `students`  
範例資料 `studentslist.csv`

```
{
  "_id": {
    "$oid": "6751d2efec2bcf46a9b1adb9"
  },
  "userName": "tkuee0787",
  "sid": "1",
  "name": "呱呱呱",
  "department": "電機工程系",
  "grade": "四年級",
  "class": "C",
  "Email": "tkuee0787@tkuim.com"
}
```

## API規格

### findAll
`UserService.ts`  

```
public async getAllStudents(): Promise<Array<DBResp<Student>> | undefined>
``` 

1. 查詢所有學生資料
- 方法: GET
- 路徑: /api/v1/user/findAll
- 功能: 取得所有學生資料。

#### 範例

```
Get http://DBHOST:PORT/api/v1/user/findAll
```

- code 200 :

```
{
    "code": 200,
    "message": "find sucess",
    "body": [
    {
        "_id": "673ea0ddc90260dd5142dbd5",
        "userName": "tkuee0787",
        "sid": "1",
        "name": "張佳慧",
        "department": "電機工程系",
        "grade": "四年級",
        "class": "A",
        "Email": "tkuee0787@tkuim.com",
        "absences": 4
    },
 ]
}

```
- code 500:  

    ```
    {
        "code": 500,
        "message": "server error"
    }
```

---

### insertOne
`UserService.ts`

```
public async insertOne(info: Student): Promise<resp<DBResp<Student> | undefined>>
``` 

1. 加入一筆學生資料
- 方法: Post
- 路徑: /api/v1/user/insertOne
- 功能: 新增一筆學生資料。

#### 範例

```
POST http://DBHOST:PORT/api/v1/user/insertOne
```

- 範例請求

```
{
    "userName": "tkuee0787",
    "name": "張佳慧",
    "department": "電機工程系",
    "grade": "四年級",
    "class": "A",
    "Email": "tkuee0787@tkuim.com",
    "absences": 4
}
```

- code 200 

```
{
    "code": 200,
    "message": "",
    "body": {
        "_id": "673ea0ddc90260dd5142dbd5",
        "userName": "tkuee0787",
        "sid": "1",
        "name": "張佳慧",
        "department": "電機工程系",
        "grade": "四年級",
        "class": "A",
        "Email": "tkuee0787@tkuim.com",
        "absences": 4,
        "__v": 0
    }
}
```

- code 403

```
{
    "code": 403,
    "message": "student list is full"
    // 或 "驗證通過"
}
```

- code 500

```
{
    "code": 500,
    "message": "server error"
}
```

---

### deleteBysid
`UserService.ts`  

```
public async deleteBysid(sid: string): Promise<resp<any>>
``` 

1. 透過學生座號`sid`刪除學生資料
- 方法: DELETE
- 路徑: /api/v1/user/deleteBysid
- 功能: 刪除指定座號的學生資料

#### 範例

```
DELETE http://DBHOST:PORT/api/v1/user/deleteBysid
```

- 範例請求

```
{
    "sid": "50"
}

```
- code 200 

```
{
    "code": 200,
    "message": "success",
    "body": {
        "acknowledged": true,
        "deletedCount": 1
    }
}
```

- code 404

```
{
    "code": 404,
    "message": "user not found"
}
```

- code 500

```
{
    "code": 500,
    "message": "server error"
}
```

---

### updateNameBysid
`UserService.ts`  

```
public async updateNameBysid(sid: string, updateData: Partial<Student>): Promise<resp<DBResp<Student> | undefined>>
``` 

1. 透過學生帳號，更新學生相關資訊
- 方法: PUT
- 路徑: /api/v1/user/updateNameBysid
- 功能: 更新指定帳號的學生資料

#### 範例

```
PUT http://DBHOST:PORT/api/v1/user/updateNameBysid
```

- 範例請求

```
{
    "userName": "tkuee0787",
    "name": "張佳慧",
    "department": "電機工程系",
    "grade": "四年級",
    "class": "A",
    "Email": "tkuee0787@tkuim.com",
    "absences": 4
}

```
- code 200 

```
{
    "code": 200,
    "message": "update success",
    "body": {
        "_id": "673ea0ddc90260dd5142dbd5",
        "userName": "tkuee0787",
        "sid": "1",
        "name": "張佳慧",
        "department": "電機工程系",
        "grade": "四年級",
        "class": "A",
        "Email": "tkuee0787@tkuim.com",
        "absences": 4
    }
}
```

- code 404

```
{
    "code": 404,
    "message": "user not found"
}
```

- code 500

```
{
    "code": 500,
    "message": "server error"
}
```


## 架構圖

## 流程圖

## demo video
## [demo影片](https://www.youtube.com/watch?v=kQAoRA4i_sE)
