//visit 테이블 정보 담기
module.exports = (sequelize, DataTypes) => (
    sequelize.define('visit', {
        datetime: {
            type: DataTypes.DATE,
            allowNull: false,
        }, 
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        }, 
        celebration: {
            type: DataTypes.INTEGER, 
            allowNull: true,
        }, 
        password: {
            type: DataTypes.STRING, 
            allowNull: false,
        }, 
    }, {
        timestamps: true, //생성일, 수정일 기록
        paranoid: true, //삭제일기록(복구용)
    })
);