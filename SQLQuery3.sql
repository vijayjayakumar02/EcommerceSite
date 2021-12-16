CREATE PROCEDURE uspGetProductList(
	@Value NVARCHAR(100) = '',
	@PageIndex INT = 0,
	@PageSize INT = 0
)
AS
BEGIN
;WITH cteGetProduct
AS
(
	SELECT ProductID, ProductName,Description,BrandID,Category,Price FROM Product
	where ((@Value is not null) AND (ProductName LIKE '%'+ @Value + '%'))
	or (@Value is null)
)
select *, (select count(ProductID) from cteGetProduct) AS TotalCount FROM cteGetProduct c
		order by c.ProductID asc
		OFFSET (@PageSize * @PageIndex) ROWS FETCH NEXT (@PageSize) ROWS ONLY;
END;

EXECUTE uspGetProductList @Value = '', @PageIndex = 2, @PageSize = 6
EXECUTE uspGetProductList @pageIndex = 0, @pageSize = 8

select * from Product