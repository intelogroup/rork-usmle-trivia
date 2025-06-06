import type { UsmleCategory } from '@/lib/types/usmle';

export const usmle_categories: UsmleCategory[] = [
  // Top-level groups (these are parents)
  { id: 'group_subject', name: 'Subject', parent_id: null, grouping: 'Subject', questionCount: 0 },
  { id: 'group_system', name: 'Systems', parent_id: null, grouping: 'System', questionCount: 0 },
  { id: 'group_principles', name: 'General Principles', parent_id: null, grouping: 'General Principles', questionCount: 0 },

  // SUBJECTS
  { id: 'subj_anatomy', name: 'Anatomy', parent_id: 'group_subject', grouping: 'Subject', questionCount: 7 },
  { id: 'subj_behavioral', name: 'Behavioral science', parent_id: 'group_subject', grouping: 'Subject', questionCount: 0 },
  { id: 'subj_biochemistry', name: 'Biochemistry', parent_id: 'group_subject', grouping: 'Subject', questionCount: 6 },
  { id: 'subj_biostatistics', name: 'Biostatistics', parent_id: 'group_subject', grouping: 'Subject', questionCount: 0 },
  { id: 'subj_embryology', name: 'Embryology', parent_id: 'group_subject', grouping: 'Subject', questionCount: 0 },
  { id: 'subj_genetics', name: 'Genetics', parent_id: 'group_subject', grouping: 'Subject', questionCount: 0 },
  { id: 'subj_histology', name: 'Histology', parent_id: 'group_subject', grouping: 'Subject', questionCount: 0 },
  { id: 'subj_immunology', name: 'Immunology', parent_id: 'group_subject', grouping: 'Subject', questionCount: 6 },
  { id: 'subj_microbiology', name: 'Microbiology', parent_id: 'group_subject', grouping: 'Subject', questionCount: 6 },
  { id: 'subj_pathology', name: 'Pathology', parent_id: 'group_subject', grouping: 'Subject', questionCount: 7 },
  { id: 'subj_pathophysiology', name: 'Pathophysiology', parent_id: 'group_subject', grouping: 'Subject', questionCount: 0 },
  { id: 'subj_pharmacology', name: 'Pharmacology', parent_id: 'group_subject', grouping: 'Subject', questionCount: 7 },
  { id: 'subj_physiology', name: 'Physiology', parent_id: 'group_subject', grouping: 'Subject', questionCount: 6 },

  // SYSTEMS
  { id: 'sys_allergy_immunology', name: 'Allergy & Immunology', parent_id: 'group_system', grouping: 'System', questionCount: 0 },
  { id: 'sys_dermatology', name: 'Dermatology', parent_id: 'group_system', grouping: 'System', questionCount: 0 },
  { id: 'sys_cardiovascular', name: 'Cardiovascular System', parent_id: 'group_system', grouping: 'System', questionCount: 8 },
  { id: 'sys_pulmonary', name: 'Pulmonary & Critical Care', parent_id: 'group_system', grouping: 'System', questionCount: 0 },
  { id: 'sys_gi', name: 'Gastrointestinal & Nutrition', parent_id: 'group_system', grouping: 'System', questionCount: 6 },
  { id: 'sys_hematology', name: 'Hematology & Oncology', parent_id: 'group_system', grouping: 'System', questionCount: 0 },
  { id: 'sys_renal', name: 'Renal, Urinary Systems & Electrolytes', parent_id: 'group_system', grouping: 'System', questionCount: 6 },
  { id: 'sys_nervous', name: 'Nervous System', parent_id: 'group_system', grouping: 'System', questionCount: 6 },
  { id: 'sys_rheumatology', name: 'Rheumatology/Orthopedics & Sports', parent_id: 'group_system', grouping: 'System', questionCount: 0 },
  { id: 'sys_endocrine', name: 'Endocrine, Diabetes & Metabolism', parent_id: 'group_system', grouping: 'System', questionCount: 6 },
  { id: 'sys_female_repro', name: 'Female Reproductive System & Breast', parent_id: 'group_system', grouping: 'System', questionCount: 0 },
  { id: 'sys_male_repro', name: 'Male Reproductive System', parent_id: 'group_system', grouping: 'System', questionCount: 0 },
  { id: 'sys_pregnancy', name: 'Pregnancy, Childbirth & Puerperium', parent_id: 'group_system', grouping: 'System', questionCount: 0 },
  { id: 'sys_ent', name: 'Ear, Nose & Throat (ENT)', parent_id: 'group_system', grouping: 'System', questionCount: 0 },
  { id: 'sys_psychiatric', name: 'Psychiatric/Behavioral & Substance Use Disorder', parent_id: 'group_system', grouping: 'System', questionCount: 0 },
  { id: 'sys_poisoning', name: 'Poisoning & Environmental Exposure', parent_id: 'group_system', grouping: 'System', questionCount: 0 },
  { id: 'sys_ophthalmology', name: 'Ophthalmology', parent_id: 'group_system', grouping: 'System', questionCount: 0 },
  { id: 'sys_social_sciences', name: 'Social Sciences (Ethics/Legal/Professional)', parent_id: 'group_system', grouping: 'System', questionCount: 0 },
  { id: 'sys_miscellaneous', name: 'Miscellaneous (Multisystem)', parent_id: 'group_system', grouping: 'System', questionCount: 0 },

  // GENERAL PRINCIPLES
  { id: 'prin_biochemistry', name: 'Biochemistry (General Principles)', parent_id: 'group_principles', grouping: 'General Principles', questionCount: 0 },
  { id: 'prin_genetics', name: 'Genetics (General Principles)', parent_id: 'group_principles', grouping: 'General Principles', questionCount: 0 },
  { id: 'prin_microbiology', name: 'Microbiology (General Principles)', parent_id: 'group_principles', grouping: 'General Principles', questionCount: 0 },
  { id: 'prin_pathology', name: 'Pathology (General Principles)', parent_id: 'group_principles', grouping: 'General Principles', questionCount: 0 },
  { id: 'prin_pharmacology', name: 'Pharmacology (General Principles)', parent_id: 'group_principles', grouping: 'General Principles', questionCount: 0 },
];