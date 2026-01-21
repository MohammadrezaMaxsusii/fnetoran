export interface Feed {
  active: boolean;
  createdAt: string;
  deletedAt: string | null;
  deviceId: string | null;
  fileName: string;
  filePath: string | null;
  geoLocation: string | null;
  geoLocationMessage: string;
  geoLocationStatus: string;
  id: string;
  item: string;
  order: string | null;
  parentId: string | null;
  removeDate: string | null;
  resolved: string | null;
  source: string;
  type: string;
  updatedAt: string | null;
}
