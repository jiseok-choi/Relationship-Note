//friend 테이블 정보 담기
module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    "friend",
    {
      name: {
        type: DataTypes.STRING(40),
        allowNull: false
      },
      age: {
        type: DataTypes.STRING(20),
        allowNull: true
      },
      gender: {
        type: DataTypes.CHAR(1),
        allowNull: false
      },
      birth: {
        type: DataTypes.DATE,
        allowNull: true
      },
      relationship: {
        type: DataTypes.STRING(50),
        allowNull: false
      },
      job: {
        type: DataTypes.STRING(100),
        allowNull: true
      },
      school: {
        type: DataTypes.STRING(50),
        allowNull: true
      },
      phone_num: {
        type: DataTypes.STRING(11),
        allowNull: true
      },
      portrait: {
        type: DataTypes.STRING,
        allowNull: true
      },
      userid: {
        type: DataTypes.INTEGER(11),
        allowNull: false
      }
    },
    {
      timestamps: true, //생성일, 수정일 기록
      paranoid: true //삭제일기록(복구용)
    }
  )
