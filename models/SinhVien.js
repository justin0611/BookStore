function SinhVien(masv,tensv,dRenLuyen,loai,dToan,dLy,dHoa,email,soDT) {
    this.maSinhVien = masv;
    this.tenSinhVien = tensv;
    this.diemRenLuyen = dRenLuyen;
    this.loaiSinhVien = loai;
    this.diemToan = dToan;
    this.diemLy = dLy;
    this.diemHoa = dHoa;
    this.email = email;
    this.soDienThoai = soDT;
    this.tinhDiemTrungBinh = function () { //input diemToan,diemLy,diemHoa
        //this trong đối tượng hoặc lớp đối tượng thì => trỏ về đối tượng hoặc lớp đối tượng đó
        var diemTrungBinh = (Number(this.diemHoa) + Number(this.diemLy) + Number(this.diemToan)) / 3;
        return diemTrungBinh;
    };
    this.xepLoai = function () {
        var diemTB = this.tinhDiemTrungBinh();
        var diemRenLuyen = this.diemRenLuyen;
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
}