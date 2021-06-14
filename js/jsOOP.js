


var arrSinhVien = [];
var kiemTraDuLieu = new Validation();
document.querySelector('#btnXacNhan').onclick = function (event) {
    event.preventDefault(); //Chặn sự kiện reload browser
    {
    var sinhVien = new SinhVien();
    //Bước 1 Lấy thông tin người dùng nhập vào từ giao diện
    sinhVien.maSinhVien = document.querySelector('#maSinhVien').value;
    sinhVien.tenSinhVien = document.querySelector('#tenSinhVien').value;
    sinhVien.email = document.querySelector('#email').value;
    sinhVien.soDienThoai = document.querySelector('#soDienThoai').value;
    sinhVien.diemRenLuyen = document.querySelector('#diemRenLuyen').value;
    sinhVien.diemToan = document.querySelector('#diemToan').value;
    sinhVien.diemLy = document.querySelector('#diemLy').value;
    sinhVien.diemHoa = document.querySelector('#diemHoa').value;
    sinhVien.loaiSinhVien = document.querySelector('#loaiSinhVien').value;
    console.log('sinhVien', sinhVien);
    //Bước 2: Tính điểm trung bình xếp loại
    var diemTB = sinhVien.tinhDiemTrungBinh();
    var xepLoaiSV = sinhVien.xepLoai();
    //Bước 3: Hiển thị dữ liệu lên giao diện
    document.querySelector('#txtMaSinhVien').innerHTML = sinhVien.maSinhVien;
    document.querySelector('#txtTenSinhVien').innerHTML = sinhVien.tenSinhVien;
    document.querySelector('#txtLoaiSinhVien').innerHTML = sinhVien.loaiSinhVien;
    document.querySelector('#txtDiemTrungBinh').innerHTML = diemTB.toFixed(2);
    document.querySelector('#txtXepLoai').innerHTML = xepLoaiSV;
    }

    //-----------------------------------Validation-------------------------------------
    // (1): Kiểm tra rỗng
    var valid = true; //.trim(): loại bỏ khoảng trống đầu và cuối của chuỗi
    valid &= kiemTraDuLieu.kiemTraRong(sinhVien.maSinhVien,'#error_required_maSinhVien','Mã sinh viên') & kiemTraDuLieu.kiemTraRong(sinhVien.tenSinhVien,'#error_required_tenSinhVien','Tên sinh viên') & kiemTraDuLieu.kiemTraRong(sinhVien.email,'#error_required_email','Email') & kiemTraDuLieu.kiemTraRong(sinhVien.soDienThoai,'#error_required_soDienThoai','Số điện thoại') & kiemTraDuLieu.kiemTraRong(sinhVien.diemToan,'#error_required_diemToan','Điểm toán') &  kiemTraDuLieu.kiemTraRong(sinhVien.diemLy,'#error_required_diemLy','Điểm lý') &  kiemTraDuLieu.kiemTraRong(sinhVien.diemHoa,'#error_required_diemHoa','Điểm hoá') &  kiemTraDuLieu.kiemTraRong(sinhVien.diemRenLuyen,'#error_required_renLuyen','Điểm rèn luyện') ;
    // (2): Kiểm tra định dạng
    // (2.1): Kiểm tra tất cả là ký tự (allLetter)
    
    valid &= kiemTraDuLieu.kiemTraTatCaKyTu(sinhVien.tenSinhVien,'#error_allLetter_tenSinhVien','Tên sinh viên');
    // (2.2): Kiểm tra tất cả là ký tự (allNumber)
    valid &= kiemTraDuLieu.kiemTraTatCaSo(sinhVien.diemToan,'#error_allNumber_diemToan','Điểm toán') & kiemTraDuLieu.kiemTraTatCaSo(sinhVien.diemLy,'#error_allNumber_diemLy','Điểm lý') & kiemTraDuLieu.kiemTraTatCaSo(sinhVien.diemHoa,'#error_allNumber_diemHoa','Điểm hoá') & kiemTraDuLieu.kiemTraTatCaSo(sinhVien.diemRenLuyen,'#error_allNumber_diemRenLuyen','Điểm rèn luyện');
    
    //(2.3) : Kiểm tra định dạng emai;
    valid &= kiemTraDuLieu.kiemTraEmail(sinhVien.email,'#error_email','email');
    

    // Kiểm tra giá trị
    valid &= kiemTraDuLieu.kiemTraGiaTri(sinhVien.diemToan,'#error_min_max_value_diemToan',0,10,'Điểm toán');

    //Kiểm tra độ dài
    valid &= kiemTraDuLieu.kiemTraDoDai(sinhVien.maSinhVien,'#error_min_max_length_maSinhVien',4,6,'Mã sinh viên')


    if(!valid) {
        return;
    }






    //Thêm dữ liệu sinh viên vào mảng
    arrSinhVien.push(sinhVien);
    console.log('arrSinhVien', arrSinhVien);
    //Tạo ra giao diện cho table bên dưới
    //Gọi hàm tạo bảng từ mảng sinh viên
    renderTableSinhVien(arrSinhVien); // đối số truyền vào hàm

    //Gọi hàm lưu dữ liệu sinh viên vào localstorage
    luuStorage();

}

function renderTableSinhVien(arrSV) { //input
    //Từ mảng 
    //arrSV = [{maSinhVien:1,tenSinhVien:'Nguyễn văn A},{maSinhVien:2,tenSinhVien:'Nguyễn văn B},{maSinhVien:3,tenSinhVien:'Nguyễn văn c}]
    //Tạo thành 1 chuỗi <tr><td></td></tr>
    var content = '';
    for (var index = 0; index < arrSV.length; index++) {

        var sv = arrSinhVien[index];
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


//Định nghĩa sự kiện cho nút xoá
function xoaSinhVien(maSVClick) { //2
    //0                                         1                                       2
    //arrSV = [{maSinhVien:1,tenSinhVien:'Nguyễn văn A},{maSinhVien:2,tenSinhVien:'Nguyễn văn B},{maSinhVien:3,tenSinhVien:'Nguyễn văn c}]

    for (var i = arrSinhVien.length - 1; i >= 0; i--) {
        //Tìm sinh viên được click trong mảng 
        var sv = arrSinhVien[i];
        if (sv.maSinhVien === maSVClick) {
            //Tìm thấy
            arrSinhVien.splice(i, 1); // Xử lý xoá  [1,2,3,4] splice(index_vị_trí_xoá,số lượng phần tử xoá từ index trở)

        }
    }
    //Gọi hàm tạo table sinh viên
    renderTableSinhVien(arrSinhVien);
    luuStorage();
}


function suaThongTin(maSVClick) {

    document.querySelector('#btnXacNhan').disabled = true;
    document.querySelector('#btnLuuThongTin').disabled = false;
    document.querySelector('#maSinhVien').disabled = true;
    console.log('maSVClick', maSVClick);
    //Tìm sinh viên trong mảng dựa vào mã sinh viên
    for (var index = 0; index < arrSinhVien.length; index++) {
        //Mỗi lần duyệt lấy ra 1 sinh viên
        var sinhVien = arrSinhVien[index];
        if (sinhVien.maSinhVien === maSVClick) {
            //Tìm ra được sinh viên
            document.querySelector('#maSinhVien').value = sinhVien.maSinhVien;
            document.querySelector('#tenSinhVien').value = sinhVien.tenSinhVien;
            document.querySelector('#email').value = sinhVien.email;
            document.querySelector('#soDienThoai').value = sinhVien.soDienThoai;
            document.querySelector('#loaiSinhVien').value = sinhVien.loaiSinhVien;
            document.querySelector('#diemToan').value = sinhVien.diemToan;
            document.querySelector('#diemLy').value = sinhVien.diemLy;
            document.querySelector('#diemHoa').value = sinhVien.diemHoa;
            document.querySelector('#diemRenLuyen').value = sinhVien.diemRenLuyen;
        }
    }
}



function luuStorage() {

    //Trước khi lưu vào localstorage => chuyển dữ liệu cần lưu thành chuỗi
    var sMangSinhVien = JSON.stringify(arrSinhVien);

    //Lưu vào localstorage
    localStorage.setItem('arrSinhVien', sMangSinhVien);

}


function layStorage() {

    //Kiểm tra xem có storage đó hay k
    if (localStorage.getItem('arrSinhVien')) {
        var sMangSinhVien = localStorage.getItem('arrSinhVien');
        arrSinhVien = JSON.parse(sMangSinhVien); // => Chuyển chuỗi lấy từ localstorage ra biến thành mảng gán vào biến arrSinhVien
        //Gọi hàm tạo dữ liệu table lên giao diện
        renderTableSinhVien(arrSinhVien);
    }
}
//Gọi sau khi giao diện load

layStorage();



document.querySelector('#btnLuuThongTin').onclick = function () {
    var sinhVienCapNhat = new SinhVien();
    sinhVienCapNhat.maSinhVien = document.querySelector('#maSinhVien').value;
    sinhVienCapNhat.tenSinhVien = document.querySelector('#tenSinhVien').value;
    sinhVienCapNhat.loaiSinhVien = document.querySelector('#loaiSinhVien').value;
    sinhVienCapNhat.diemToan = document.querySelector('#diemToan').value;
    sinhVienCapNhat.diemLy = document.querySelector('#diemLy').value;
    sinhVienCapNhat.diemHoa = document.querySelector('#diemHoa').value;
    sinhVienCapNhat.diemRenLuyen = document.querySelector('#diemRenLuyen').value;
    sinhVienCapNhat.email = document.querySelector('#email').value;
    sinhVienCapNhat.soDienThoai = document.querySelector('#soDienThoai').value;

    console.log('svCapNhat', sinhVienCapNhat);

    //tìm ra sinh viên trong mảng
    for (var index = 0; index < arrSinhVien.length; index++) {
        var sinhVien = arrSinhVien[index];
        if (sinhVien.maSinhVien === sinhVienCapNhat.maSinhVien) {
            //Cập nhật lại các giá trị sinh viên trong mảng từ dữ liệu sinh viên lấy từ input người dùng
            sinhVien.tenSinhVien = sinhVienCapNhat.tenSinhVien;
            sinhVien.loaiSinhVien = sinhVienCapNhat.loaiSinhVien;
            sinhVien.diemToan = sinhVienCapNhat.diemToan;
            sinhVien.diemLy = sinhVienCapNhat.diemLy;
            sinhVien.diemHoa = sinhVienCapNhat.diemHoa;
            sinhVien.diemRenLuyen = sinhVienCapNhat.diemRenLuyen;
            sinhVien.loaiSinhVien = sinhVienCapNhat.loaiSinhVien;
            sinhVien.email = sinhVienCapNhat.email;
            sinhVien.soDienThoai = sinhVienCapNhat.soDienThoai;

        }
    }
    //Sau khi cập nhật xong => Lưu vào localstorage và gọi hàm tạo lại table mới
    luuStorage();
    renderTableSinhVien(arrSinhVien);

    //Mở lại các nút
    document.querySelector('#btnLuuThongTin').disabled = true;
    document.querySelector('#btnXacNhan').disabled = false;
    document.querySelector('#maSinhVien').disabled = false;
}