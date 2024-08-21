import * as migration_20240719_103119_initial_migration from './20240719_103119_initial_migration';
import * as migration_20240720_104935_add_docuuments_funds_archive from './20240720_104935_add_docuuments_funds_archive';
import * as migration_20240720_130156_settings_switch_viber_to_text from './20240720_130156_settings_switch_viber_to_text';
import * as migration_20240720_143941_add_field_to_Documents_Funds_Archive_LastName from './20240720_143941_add_field_to_Documents_Funds_Archive_LastName';
import * as migration_20240721_094126_documents_rename_reserseSide_to_reverseSide from './20240721_094126_documents_rename_reserseSide_to_reverseSide';
import * as migration_20240723_110620_fix_media_size_last_name_slug from './20240723_110620_fix_media_size_last_name_slug';
import * as migration_20240724_090706_feat_LastNames_fields from './20240724_090706_feat_LastNames_fields';
import * as migration_20240729_155134_LastName_document_one_globals_remove_Localization from './20240729_155134_LastName_document_one_globals_remove_Localization';
import * as migration_20240731_123515_fix_Document_LastName_add_Town_MediaDocuments from './20240731_123515_fix_Document_LastName_add_Town_MediaDocuments';
import * as migration_20240802_111232_LastNames_documentNumber_Documents_title_checking from './20240802_111232_LastNames_documentNumber_Documents_title_checking';
import * as migration_20240803_110829_Document_case_text from './20240803_110829_Document_case_text';
import * as migration_20240807_104731_MediaDocuments_separate_gallery from './20240807_104731_MediaDocuments_separate_gallery';
import * as migration_20240807_113416_Document_media_upload from './20240807_113416_Document_media_upload';
import * as migration_20240807_152406_RichText_link from './20240807_152406_RichText_link';
import * as migration_20240812_170051_Document_fix_media_payload_beta77 from './20240812_170051_Document_fix_media_payload_beta77';
import * as migration_20240821_082649_hero_eclipse from './20240821_082649_hero_eclipse';
import * as migration_20240821_113009_fix_media_image_sizes from './20240821_113009_fix_media_image_sizes';

export const migrations = [
  {
    up: migration_20240719_103119_initial_migration.up,
    down: migration_20240719_103119_initial_migration.down,
    name: '20240719_103119_initial_migration',
  },
  {
    up: migration_20240720_104935_add_docuuments_funds_archive.up,
    down: migration_20240720_104935_add_docuuments_funds_archive.down,
    name: '20240720_104935_add_docuuments_funds_archive',
  },
  {
    up: migration_20240720_130156_settings_switch_viber_to_text.up,
    down: migration_20240720_130156_settings_switch_viber_to_text.down,
    name: '20240720_130156_settings_switch_viber_to_text',
  },
  {
    up: migration_20240720_143941_add_field_to_Documents_Funds_Archive_LastName.up,
    down: migration_20240720_143941_add_field_to_Documents_Funds_Archive_LastName.down,
    name: '20240720_143941_add_field_to_Documents_Funds_Archive_LastName',
  },
  {
    up: migration_20240721_094126_documents_rename_reserseSide_to_reverseSide.up,
    down: migration_20240721_094126_documents_rename_reserseSide_to_reverseSide.down,
    name: '20240721_094126_documents_rename_reserseSide_to_reverseSide',
  },
  {
    up: migration_20240723_110620_fix_media_size_last_name_slug.up,
    down: migration_20240723_110620_fix_media_size_last_name_slug.down,
    name: '20240723_110620_fix_media_size_last_name_slug',
  },
  {
    up: migration_20240724_090706_feat_LastNames_fields.up,
    down: migration_20240724_090706_feat_LastNames_fields.down,
    name: '20240724_090706_feat_LastNames_fields',
  },
  {
    up: migration_20240729_155134_LastName_document_one_globals_remove_Localization.up,
    down: migration_20240729_155134_LastName_document_one_globals_remove_Localization.down,
    name: '20240729_155134_LastName_document_one_globals_remove_Localization',
  },
  {
    up: migration_20240731_123515_fix_Document_LastName_add_Town_MediaDocuments.up,
    down: migration_20240731_123515_fix_Document_LastName_add_Town_MediaDocuments.down,
    name: '20240731_123515_fix_Document_LastName_add_Town_MediaDocuments',
  },
  {
    up: migration_20240802_111232_LastNames_documentNumber_Documents_title_checking.up,
    down: migration_20240802_111232_LastNames_documentNumber_Documents_title_checking.down,
    name: '20240802_111232_LastNames_documentNumber_Documents_title_checking',
  },
  {
    up: migration_20240803_110829_Document_case_text.up,
    down: migration_20240803_110829_Document_case_text.down,
    name: '20240803_110829_Document_case_text',
  },
  {
    up: migration_20240807_104731_MediaDocuments_separate_gallery.up,
    down: migration_20240807_104731_MediaDocuments_separate_gallery.down,
    name: '20240807_104731_MediaDocuments_separate_gallery',
  },
  {
    up: migration_20240807_113416_Document_media_upload.up,
    down: migration_20240807_113416_Document_media_upload.down,
    name: '20240807_113416_Document_media_upload',
  },
  {
    up: migration_20240807_152406_RichText_link.up,
    down: migration_20240807_152406_RichText_link.down,
    name: '20240807_152406_RichText_link',
  },
  {
    up: migration_20240812_170051_Document_fix_media_payload_beta77.up,
    down: migration_20240812_170051_Document_fix_media_payload_beta77.down,
    name: '20240812_170051_Document_fix_media_payload_beta77',
  },
  {
    up: migration_20240821_082649_hero_eclipse.up,
    down: migration_20240821_082649_hero_eclipse.down,
    name: '20240821_082649_hero_eclipse',
  },
  {
    up: migration_20240821_113009_fix_media_image_sizes.up,
    down: migration_20240821_113009_fix_media_image_sizes.down,
    name: '20240821_113009_fix_media_image_sizes',
  },
];
