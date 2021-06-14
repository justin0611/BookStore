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