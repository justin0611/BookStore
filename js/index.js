//Định nghĩa sự kiện click lấy thông tin người dùng nhập
document.querySelector('#btnXacNhan').onclick = function (event) {
    event.preventDefault(); //Chặn sự kiện reload browser
    //B1 lấy thông tin người dùng nhập vào
    // .....
    var maSinhVien = document.querySelector('#maSinhVien').value;
    var tenSinhVien = document.querySelector('#tenSinhVien').value;
    var email = document.querySelector('#email').value;
    var soDienThoai = document.querySelector('#soDienThoai').value;
    var diemRenLuyen = document.querySelector('#diemRenLuyen').value;
    var diemToan = document.querySelector('#diemToan').value;
    var diemLy = document.querySelector('#diemLy').value;
    var diemHoa = document.querySelector('#diemHoa').value;
    var loaiSinhVien = document.querySelector('#loaiSinhVien').value;
    // console.log(maSinhVien);
    // console.log(tenSinhVien);
    // console.log(email);
    // console.log(soDienThoai);
    // console.log(diemRenLuyen);
    // console.log(diemToan);
    // console.log(diemLy);
    // console.log(diemHoa);
    // console.log(loaiSinhVien);

    //Bước 2: tính toán điểm trung bình và xếp loại
    var diemTB = tinhDiemTrungBinh(diemToan,diemLy,diemHoa);
    var xepLoaiSV = xepLoai(diemTB,diemRenLuyen);

    console.log('diemTB',diemTB);
    console.log('xepLoaiSV',xepLoaiSV);

    //Bước 3: Tìm đến thành phần trên giao diện dựa vào id để hiển thị 
    document.querySelector('#txtMaSinhVien').innerHTML = maSinhVien;
    document.querySelector('#txtTenSinhVien').innerHTML = tenSinhVien;
    document.querySelector('#txtLoaiSinhVien').innerHTML = loaiSinhVien;
    document.querySelector('#txtDiemTrungBinh').innerHTML = diemTB;
    document.querySelector('#txtXepLoai').innerHTML = xepLoaiSV;

}


//Viết hàm cần xác input và output (có gì và cần gì)
function tinhDiemTrungBinh(dToan, dLy, dHoa) { //input
    var dtb = (Number(dToan) + Number(dLy) + Number(dHoa)) / 3;
    return dtb;
} //output

function xepLoai(diemTB, diemRenLuyen) {
    var output = '';
    if (diemRenLuyen < 5) {
        output = 'Yếu';
    } else {
        if (diemTB < 5) {
            output = 'Yếu';
        } else if (diemTB >= 5 && diemTB < 6.5) {
            output = 'Trung bình';
        } else if (diemTB >= 6.5 && diemTB < 7) {
            output = 'Trung bình khá';
        } else if (diemTB >= 7 && diemTB < 8) {
            output = 'Khá';
        } else if (diemTB >= 8 && diemTB < 9) {
            output = 'Giỏi'
        } else if (diemTB >= 8 && diemTB <= 10) {
            output = 'Xuất sắc';
        } else {
            output = 'Không hợp lệ !';
        }
    }
    return output;
}
// diemRenLuyen < 5 => yếu, ngược lại lớn 5 
// <5: Yếu
// 5 <= dtb < 6.5: Trung bình
// 6.5 <= dtb < 7 : Trung bình khá
// 7 <= dtb <8 : Khá
// 8 <= dtb <9 : Giỏi
// 9 <= dtb <=10 : Xuất sắc 