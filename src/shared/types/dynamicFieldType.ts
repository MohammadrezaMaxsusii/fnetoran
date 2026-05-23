export type DynamicField = {
  id: number;
  asset_type_id: number;
  name: string;
  label: string;
  field_type: string;
  options: any;
  is_required: boolean;
  section: string;
  help_text: string | null;
  parentId: number | null;
  createdAt: string;
  updatedAt: string | null;
  deletedAt: string | null;
  is_active: boolean;
};
