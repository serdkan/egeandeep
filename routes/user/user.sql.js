const userLoginCheckSql = `select id,userName,
active,syncCode,mail,
nameSurname,firmId,workplaceId,
phone,job,cityId,townId,countryId,countryNameTR,countryNameEN,birthday from SYSV_User(nolock) where UserName=@userName and Password=@password`;
const userInfoSql = `select id,userName,
active,syncCode,mail,
nameSurname,firmId,workplaceId,
phone,job,cityId,townId,countryId,countryNameTR,countryNameEN,birthday from SYSV_User(nolock) where id=@userId`;
const userParamsSql = `select * from SYS_Params(nolock) where FirmId=@firmId`;
const userUserPermissionSql = `SELECT 
                            a.Id AS id,
                            a.FirmId AS firmId,
                            a.UserId AS userId,
                            a.UrlId AS urlId,
                            a.IsList AS isList,
                            a.IsCreate AS isCreate,
                            a.IsDelete AS isDelete,
                            a.IsUpdate AS isUpdate,
                            a.IsPriceLook AS isPriceLook,
                            b.Url AS url,
                            b.Title AS title,
                            b.ParentUrlId as parentUrlId,
                            c.Url as parentUrl,
                            c.Title as parentTitle,
                            c.Icon as icon
                            FROM SYS_UserPermission a
                            LEFT JOIN SYS_Url b on a.UrlId=b.Id
                            LEFT JOIN SYS_ParentUrl c on b.ParentUrlId=c.Id
                            WHERE a.FirmId=1 and UserId=@userId`;
module.exports = {
  userLoginCheckSql,
  userParamsSql,
  userUserPermissionSql,
  userInfoSql,
};
