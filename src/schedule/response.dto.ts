export class ProductDTO {
  shortName: string;
  skuName: string;
  spuName: string;
  colorCode: string | null;
  colorValue: string;
  defaultImage: string;
  skuId: number;
  stock: number;
  proPrice: number;
  defaultChecked: number;
  stockOutChecked: number;
  benefitType: number;
  presentedChecked: number | null;
  storage: string;
  mobileRam: string;
  brief: string;
  salePrice: number;
  marketable: number;
  spuId: number;
  name: string;
  commodityType: number;
  cornerPic: string | null;
  cornerPicPC: string | null;
  cornerPicWAP: string | null;
  colorName: string;
  netType: string;
}

export class DataDTO {
  result: ProductDTO[];
  pageNum: number;
  pageSize: number;
  startRow: number;
  endRow: number;
  total: number;
  pages: number;
  reasonable: boolean;
  pageSizeZero: boolean;
}

export class ResponseDTO {
  success: string;
  code: string;
  codeDesc: string;
  msg: string;
  msgParams: null;
  data: DataDTO;
}