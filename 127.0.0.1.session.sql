use Lager;
SELECT pc.*, pcd.*, pcs.*
FROM productclothes pc JOIN productclothes_description pcd ON pc.id = pcd.product_id
JOIN productclothes_status pcs ON pc.id = pcs.productClothes_id
WHERE pcs.status = 1 AND pc.slug =  AND pcd.language_id = 1