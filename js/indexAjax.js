// // console.log(axios);
// // var promise = axios({
// //     url:'../data/data.json', //Đường dẫn đến file hoặc đường dẫn backend cung cấp
// //     method: 'GET',
// //     responseType:'json'
// // });

// // //Nếu thành công
// // promise.then(function (result) {
// //     console.log(result.data);
// //     document.querySelector('#txtMaSinhVien').innerHTML = result.data.maSinhVien;
// //     document.querySelector('#txtTenSinhVien').innerHTML = result.data.tenSinhVien;
// // })


// // //Nếu thất bại
// // promise.catch(function(error) {
// //     console.log(error);
// // })

// var promise = axios({
//     url:'../data/data.xml',//Đường dẫn đến file hoặc đường dẫn backend cung cấp
//     method:'GET',
//     responseType: 'document'
// });

// //Hàm xử lý thành công 
// promise.then(function(result) {

//     console.log('result',result.data);

//     var maSinhVien = result.data.querySelector('maSinhVien').innerHTML;
//     var tenSinhVien = result.data.querySelector('tenSinhVien').innerHTML;

//     document.querySelector('#txtMaSinhVien').innerHTML = maSinhVien;
//     document.querySelector('#txtTenSinhVien').innerHTML = tenSinhVien;

// })


// //Hàm xử lý thất bại
// promise.catch(function(error) {
//     console.log('error',error.response.data)
// })



function getSinhVienApi() {

    //ajax là phương thức bất đồng bộ => trong lúc nó thực thi gửi request đi, thì các tác vụ tiếp theo vẫn làm 
    var promise = axios({
        url: 'http://svcy.myclass.vn/api/SinhVienApi/LayDanhSachSinhVien', //thông tin backend cung cấp
        method: 'GET', //Giao thức backend cung cấp
        responseType: 'json' //Kiểu dữ liệu trả về do backend cung cấp
    });

    //Hàm xử lý request thành công
    promise.then(function (result) {
        console.log('1');
        console.log(result.data);
        //Từ dữ liệu backend gửi về viết hàm hiển thị dữ liệu lên table
        renderTableSinhVien(result.data);
    });

    //Hàm xử lý request thất bại
    promise.catch(function (errors) {
        console.log('errors', errors);
    });


    console.log('2');

}


//Gọi hàm khi người dùng vừa vào web
getSinhVienApi();
function renderTableSinhVien(arrSV) { //input
    //Từ mảng 
    //arrSV = [{maSinhVien:1,tenSinhVien:'Nguyễn văn A},{maSinhVien:2,tenSinhVien:'Nguyễn văn B},{maSinhVien:3,tenSinhVien:'Nguyễn văn c}]
    //Tạo thành 1 chuỗi <tr><td></td></tr>
    var content = '';
    for (var index = 0; index < arrSV.length; index++) {

        var sv = arrSV[index];
        //Mỗi lần duyệt lấy ra 1 đối tượng sinh viên
        var sinhVien = new SinhVien(sv.maSinhVien, sv.tenSinhVien, sv.diemRenLuyen, sv.loaiSinhVien, sv.diemToan, sv.diemLy, sv.diemHoa, sv.email, sv.soDienThoai);

        //Từ đối tượng sinh viên => tạo ra thẻ tr
        var trSinhVien = `
                        <tr>
                            <td>${sinhVien.maSinhVien}</td>
                            <td>${sinhVien.tenSinhVien}</td>
                            <td>${sinhVien.loaiSinhVien}</td>
                            <td>${sinhVien.tinhDiemTrungBinh()}</td>
                            <td>${sinhVien.diemRenLuyen}</td>
                            <td>
                            <button class="btn btn-danger" onclick="xoaSinhVien('${sinhVien.maSinhVien}')" >Xoá
                            </button>
                            <button class="btn btn-primary" onclick="suaThongTin('${sinhVien.maSinhVien}')" >chỉnh sửa
                            </button>
                            </td>
                        </tr>
        `;
        content += trSinhVien;
    }
    //Dom đến thẻ tblSinhVien chèn chuỗi content vào innerHTML
    document.querySelector('#tblSinhVien').innerHTML = content;
}


// -------------------------- Nghiệp vụ thêm sinh viên (POST DATA) -------------------------------


document.querySelector('#btnXacNhan').onclick = function (event) {
    event.preventDefault();

    //Lấy thông tin người dùng nhập vào theo format data backend yêu cầu
    var sinhVien = new SinhVien();
    sinhVien.maSinhVien = document.querySelector('#maSinhVien').value;
    sinhVien.tenSinhVien = document.querySelector('#tenSinhVien').value;
    sinhVien.diemToan = document.querySelector('#diemToan').value;
    sinhVien.diemLy = document.querySelector('#diemLy').value;
    sinhVien.diemHoa = document.querySelector('#diemHoa').value;
    sinhVien.diemRenLuyen = document.querySelector('#diemRenLuyen').value;
    sinhVien.email = document.querySelector('#email').value;
    sinhVien.soDienThoai = document.querySelector('#soDienThoai').value;
    sinhVien.loaiSinhVien = document.querySelector('#loaiSinhVien').value;

    console.log('sinhVien', sinhVien);

    var promise = axios({
        url: 'http://svcy.myclass.vn/api/SinhVienApi/ThemSinhVien', //Đường dẫn backend yêu cầu
        method: 'POST', //Phương thức backend yêu cầu
        data: sinhVien //Dữ liệu gửi đi phải đúng định dạng
    })
    //Xử lý thành công
    promise.then(function (result) {
        console.log('result', result.data);
        //Load lại table từ api get layThongTinSinhVien
        getSinhVienApi();
    })

    //Xử lý thất bại
    promise.catch(function (error) {
        console.log('error', error.reponse.data);
    })

    // {
    //     "maSinhVien": 0,
    //     "tenSinhVien": "string",
    //     "loaiSinhVien": "string",
    //     "diemToan": 0,
    //     "diemLy": 0,
    //     "diemHoa": 0,
    //     "diemRenLuyen": 0,
    //     "email": "string",
    //     "soDienThoai": "string"
    //   }

}


//------------------------------------------ Xoá sinh viên -----------------------------


function xoaSinhVien(maSinhVienClick) {

    var promise = axios({
        url: `http://svcy.myclass.vn/api/SinhVienApi/XoaSinhVien?maSinhVien=${maSinhVienClick}`,
        method: 'DELETE'
    });


    promise.then(function (result) {
        console.log('result', result.data);
        //Xoá thành công load lại table
        getSinhVienApi();
    });

    promise.catch(function (error) {
        console.log('error', error.response.data);
    })

}


//-----------------------------Sửa sinh viên -------------------

function suaThongTin(maSinhVien) {

    var promise = axios({
        url: `http://svcy.myclass.vn/api/SinhVienApi/LayThongTinSinhVien?maSinhVien=${maSinhVien}`,
        method: 'GET'
    });

    promise.then(function (result) {
        console.log(result.data);
        var sinhVien = result.data;
        //Load dữ liệu lên các input
        document.querySelector('#maSinhVien').value = sinhVien.maSinhVien;
        document.querySelector('#tenSinhVien').value = sinhVien.tenSinhVien;
        document.querySelector('#diemToan').value = sinhVien.diemToan;
        document.querySelector('#diemLy').value = sinhVien.diemLy;
        document.querySelector('#diemHoa').value = sinhVien.diemHoa;
        document.querySelector('#diemRenLuyen').value = sinhVien.diemRenLuyen;
        document.querySelector('#email').value = sinhVien.email;
        document.querySelector('#soDienThoai').value = sinhVien.soDienThoai;
        document.querySelector('#loaiSinhVien').value = sinhVien.loaiSinhVien;

    });

    promise.then(function (result) {
        console.log(result.data);
    })
    document.querySelector('#btnLuuThongTin').disabled = false;

}

//----------------------------------------------------------------Cập nhật dữ liệu ----------------------------------
document.querySelector('#btnLuuThongTin').onclick = function () {

    //Lấy thông tin người dùng sau khi sửa đổi trên giao diện
    var sinhVien = new SinhVien();
    sinhVien.maSinhVien = document.querySelector('#maSinhVien').value;
    sinhVien.tenSinhVien = document.querySelector('#tenSinhVien').value;
    sinhVien.diemToan = document.querySelector('#diemToan').value;
    sinhVien.diemLy = document.querySelector('#diemLy').value;
    sinhVien.diemHoa = document.querySelector('#diemHoa').value;
    sinhVien.diemRenLuyen = document.querySelector('#diemRenLuyen').value;
    sinhVien.email = document.querySelector('#email').value;
    sinhVien.soDienThoai = document.querySelector('#soDienThoai').value;
    sinhVien.loaiSinhVien = document.querySelector('#loaiSinhVien').value;

    //Gọi api
    var promise = axios({
        url:`http://svcy.myclass.vn/api/SinhVienApi/CapNhatThongTinSinhVien?maSinhVien=${sinhVien.maSinhVien}`,
        method:'PUT',
        data:sinhVien
        // data:sinhVien //{
        //     "maSinhVien": "string",
        //     "tenSinhVien": "string",
        //     "loaiSinhVien": "string",
        //     "diemToan": 0,
        //     "diemLy": 0,
        //     "diemHoa": 0,
        //     "diemRenLuyen": 0,
        //     "email": "string",
        //     "soDienThoai": "string"
        //   }
    });

    promise.then(function(result) {
        console.log('result',result.data);
        //Gọi lại api lấy danh sách load lại dữ liệu mới
        getSinhVienApi();
    })

    promise.catch(function(error) {
        console.log(error.response.data)
    })

}