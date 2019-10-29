//wedding 테이블 정보 담기
module.exports = (sequelize, DataTypes) => (
    sequelize.define('wedding', {
        date: {
            type: DataTypes.DATE,
            allowNull: false,
        }, 
        time: {
            type: DataTypes.STRING,
            allowNull: false,
        }, 
        groom: {
            type: DataTypes.STRING, 
            allowNull: false,
        }, 
        birde: {
            type: DataTypes.STRING, 
            allowNull: true,
        }, 
        invite: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        groomFather: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        groomMother: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        birdeFather: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        birdeMother: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        mainPicture: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        subPicture: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        lat: {
            type: DataTypes.DECIMAL,
            allowNull: false,
        },
        lng: {
            type: DataTypes.DECIMAL,
            allowNull: false,
        },
        post: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        weddingHall: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        userid: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
        },
    }, {
        timestamps: true, //생성일, 수정일 기록
        paranoid: true, //삭제일기록(복구용)
    })
);