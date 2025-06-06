import type { UsmleQuestion } from '@/lib/types/usmle';

export const usmle_questions: UsmleQuestion[] = [
  // Cardiology Questions (8 questions) - sys_cardiovascular
  {
    id: 'q1',
    question_text: "A 65-year-old male presents with crushing chest pain. ECG shows ST-segment elevation in leads II, III, and aVF. Which coronary artery is most likely occluded?",
    options: [
      { id: '1', text: 'Left Anterior Descending (LAD)' },
      { id: '2', text: 'Right Coronary Artery (RCA)' },
      { id: '3', text: 'Left Circumflex (LCX)' },
      { id: '4', text: 'Left Main Coronary Artery' }
    ],
    correct_option_id: '2',
    explanation: 'ST elevation in the inferior leads (II, III, aVF) points to an inferior wall myocardial infarction, which is most commonly caused by occlusion of the Right Coronary Artery (RCA).',
    category_id: 'sys_cardiovascular',
    difficulty: 'medium',
  },
  {
    id: 'q2',
    question_text: "What is the most common cause of heart failure in developed countries?",
    options: [
      { id: '1', text: 'Hypertension' },
      { id: '2', text: 'Coronary artery disease' },
      { id: '3', text: 'Valvular disease' },
      { id: '4', text: 'Cardiomyopathy' }
    ],
    correct_option_id: '2',
    explanation: 'Coronary artery disease is the leading cause of heart failure in developed countries, accounting for approximately 60-70% of cases.',
    category_id: 'sys_cardiovascular',
    difficulty: 'easy',
  },
  {
    id: 'q3',
    question_text: "A patient presents with a harsh systolic murmur that increases with Valsalva maneuver. What is the most likely diagnosis?",
    options: [
      { id: '1', text: 'Aortic stenosis' },
      { id: '2', text: 'Mitral regurgitation' },
      { id: '3', text: 'Hypertrophic cardiomyopathy' },
      { id: '4', text: 'Ventricular septal defect' }
    ],
    correct_option_id: '3',
    explanation: 'Hypertrophic cardiomyopathy is characterized by a systolic murmur that increases with maneuvers that decrease preload (like Valsalva), unlike most other murmurs.',
    category_id: 'sys_cardiovascular',
    difficulty: 'hard',
  },
  {
    id: 'q4',
    question_text: "Which medication is contraindicated in patients with severe aortic stenosis?",
    options: [
      { id: '1', text: 'Beta-blockers' },
      { id: '2', text: 'ACE inhibitors' },
      { id: '3', text: 'Nitroglycerin' },
      { id: '4', text: 'Calcium channel blockers' }
    ],
    correct_option_id: '3',
    explanation: 'Nitroglycerin can cause dangerous hypotension in patients with severe aortic stenosis by reducing preload in a fixed-output state.',
    category_id: 'sys_cardiovascular',
    difficulty: 'medium',
  },
  {
    id: 'q5',
    question_text: "What is the normal ejection fraction range for the left ventricle?",
    options: [
      { id: '1', text: '40-50%' },
      { id: '2', text: '50-70%' },
      { id: '3', text: '70-80%' },
      { id: '4', text: '30-40%' }
    ],
    correct_option_id: '2',
    explanation: 'Normal left ventricular ejection fraction is typically 50-70%. Values below 40% indicate systolic dysfunction.',
    category_id: 'sys_cardiovascular',
    difficulty: 'easy',
  },
  {
    id: 'q6',
    question_text: "Which arrhythmia is most commonly associated with Wolff-Parkinson-White syndrome?",
    options: [
      { id: '1', text: 'Atrial fibrillation' },
      { id: '2', text: 'Atrioventricular reentrant tachycardia (AVRT)' },
      { id: '3', text: 'Ventricular tachycardia' },
      { id: '4', text: 'Atrial flutter' }
    ],
    correct_option_id: '2',
    explanation: 'AVRT is the most common arrhythmia in WPW syndrome, caused by reentry through the accessory pathway.',
    category_id: 'sys_cardiovascular',
    difficulty: 'hard',
  },
  {
    id: 'q7',
    question_text: "What is the first-line treatment for stable angina?",
    options: [
      { id: '1', text: 'Calcium channel blockers' },
      { id: '2', text: 'Beta-blockers' },
      { id: '3', text: 'Nitrates' },
      { id: '4', text: 'ACE inhibitors' }
    ],
    correct_option_id: '2',
    explanation: 'Beta-blockers are first-line therapy for stable angina as they reduce heart rate and myocardial oxygen demand.',
    category_id: 'sys_cardiovascular',
    difficulty: 'easy',
  },
  {
    id: 'q8',
    question_text: "Which finding on echocardiogram is pathognomonic for cardiac tamponade?",
    options: [
      { id: '1', text: 'Pericardial effusion' },
      { id: '2', text: 'Ventricular interdependence' },
      { id: '3', text: 'Reduced ejection fraction' },
      { id: '4', text: 'Mitral regurgitation' }
    ],
    correct_option_id: '2',
    explanation: 'Ventricular interdependence (respiratory variation in ventricular filling) is the hallmark echocardiographic finding in cardiac tamponade.',
    category_id: 'sys_cardiovascular',
    difficulty: 'hard',
  },

  // Pharmacology Questions (7 questions) - subj_pharmacology
  {
    id: 'q9',
    question_text: "Which of the following diuretics works by inhibiting the Na-K-2Cl cotransporter in the thick ascending loop of Henle?",
    options: [
      { id: '1', text: 'Hydrochlorothiazide' },
      { id: '2', text: 'Spironolactone' },
      { id: '3', text: 'Furosemide' },
      { id: '4', text: 'Acetazolamide' }
    ],
    correct_option_id: '3',
    explanation: 'Loop diuretics, such as Furosemide, exert their effect by inhibiting the Na-K-2Cl cotransporter in the thick ascending limb of the Loop of Henle.',
    category_id: 'subj_pharmacology',
    difficulty: 'easy',
  },
  {
    id: 'q10',
    question_text: "What is the mechanism of action of ACE inhibitors?",
    options: [
      { id: '1', text: 'Block angiotensin II receptors' },
      { id: '2', text: 'Inhibit conversion of angiotensin I to angiotensin II' },
      { id: '3', text: 'Block calcium channels' },
      { id: '4', text: 'Inhibit renin release' }
    ],
    correct_option_id: '2',
    explanation: 'ACE inhibitors work by blocking the angiotensin-converting enzyme, preventing the conversion of angiotensin I to angiotensin II.',
    category_id: 'subj_pharmacology',
    difficulty: 'easy',
  },
  {
    id: 'q11',
    question_text: "Which cytochrome P450 enzyme is responsible for metabolizing warfarin?",
    options: [
      { id: '1', text: 'CYP2D6' },
      { id: '2', text: 'CYP3A4' },
      { id: '3', text: 'CYP2C9' },
      { id: '4', text: 'CYP1A2' }
    ],
    correct_option_id: '3',
    explanation: 'Warfarin is primarily metabolized by CYP2C9. Genetic polymorphisms in this enzyme can significantly affect warfarin dosing requirements.',
    category_id: 'subj_pharmacology',
    difficulty: 'hard',
  },
  {
    id: 'q12',
    question_text: "Which medication requires monitoring of serum levels due to a narrow therapeutic window?",
    options: [
      { id: '1', text: 'Amoxicillin' },
      { id: '2', text: 'Digoxin' },
      { id: '3', text: 'Ibuprofen' },
      { id: '4', text: 'Metformin' }
    ],
    correct_option_id: '2',
    explanation: 'Digoxin has a narrow therapeutic window and requires regular monitoring of serum levels to prevent toxicity.',
    category_id: 'subj_pharmacology',
    difficulty: 'medium',
  },
  {
    id: 'q13',
    question_text: "What is the antidote for acetaminophen overdose?",
    options: [
      { id: '1', text: 'Naloxone' },
      { id: '2', text: 'N-acetylcysteine' },
      { id: '3', text: 'Flumazenil' },
      { id: '4', text: 'Atropine' }
    ],
    correct_option_id: '2',
    explanation: 'N-acetylcysteine is the specific antidote for acetaminophen overdose, working by replenishing glutathione stores.',
    category_id: 'subj_pharmacology',
    difficulty: 'medium',
  },
  {
    id: 'q14',
    question_text: "Which class of antibiotics is contraindicated in children due to effects on developing cartilage?",
    options: [
      { id: '1', text: 'Penicillins' },
      { id: '2', text: 'Macrolides' },
      { id: '3', text: 'Fluoroquinolones' },
      { id: '4', text: 'Cephalosporins' }
    ],
    correct_option_id: '3',
    explanation: 'Fluoroquinolones are contraindicated in children because they can affect developing cartilage and cause arthropathy.',
    category_id: 'subj_pharmacology',
    difficulty: 'medium',
  },
  {
    id: 'q82',
    question_text: "What is the primary mechanism of action for statin drugs?",
    options: [
      { id: '1', text: 'Inhibiting bile acid reabsorption' },
      { id: '2', text: 'Decreasing triglyceride synthesis' },
      { id: '3', text: 'Inhibiting HMG-CoA reductase' },
      { id: '4', text: 'Increasing lipoprotein lipase activity' }
    ],
    correct_option_id: '3',
    explanation: 'Statins work by inhibiting HMG-CoA reductase, which is the rate-limiting enzyme in hepatic cholesterol synthesis.',
    category_id: 'subj_pharmacology',
    difficulty: 'medium',
  },

  // Pathology Questions (7 questions) - subj_pathology
  {
    id: 'q15',
    question_text: "What is the most common type of lung cancer?",
    options: [
      { id: '1', text: 'Squamous cell carcinoma' },
      { id: '2', text: 'Adenocarcinoma' },
      { id: '3', text: 'Small cell lung cancer' },
      { id: '4', text: 'Large cell carcinoma' }
    ],
    correct_option_id: '2',
    explanation: 'Adenocarcinoma is now the most common type of lung cancer, accounting for about 40% of all lung cancers, and is more common in non-smokers.',
    category_id: 'subj_pathology',
    difficulty: 'easy',
  },
  {
    id: 'q16',
    question_text: "Which tumor marker is most specific for hepatocellular carcinoma?",
    options: [
      { id: '1', text: 'CEA' },
      { id: '2', text: 'CA 19-9' },
      { id: '3', text: 'Alpha-fetoprotein (AFP)' },
      { id: '4', text: 'PSA' }
    ],
    correct_option_id: '3',
    explanation: 'Alpha-fetoprotein (AFP) is the most specific tumor marker for hepatocellular carcinoma, though it can also be elevated in other liver diseases.',
    category_id: 'subj_pathology',
    difficulty: 'medium',
  },
  {
    id: 'q17',
    question_text: "What is the characteristic microscopic finding in Alzheimer disease?",
    options: [
      { id: '1', text: 'Lewy bodies' },
      { id: '2', text: 'Neurofibrillary tangles and amyloid plaques' },
      { id: '3', text: 'Pick bodies' },
      { id: '4', text: 'Hirano bodies' }
    ],
    correct_option_id: '2',
    explanation: 'Alzheimer disease is characterized by the presence of neurofibrillary tangles (tau protein) and amyloid plaques (beta-amyloid protein) in the brain.',
    category_id: 'subj_pathology',
    difficulty: 'medium',
  },
  {
    id: 'q18',
    question_text: "Which type of necrosis is characteristic of myocardial infarction?",
    options: [
      { id: '1', text: 'Caseous necrosis' },
      { id: '2', text: 'Coagulative necrosis' },
      { id: '3', text: 'Liquefactive necrosis' },
      { id: '4', text: 'Fat necrosis' }
    ],
    correct_option_id: '2',
    explanation: 'Coagulative necrosis is the characteristic type of cell death in myocardial infarction, where tissue architecture is preserved.',
    category_id: 'subj_pathology',
    difficulty: 'medium',
  },
  {
    id: 'q19',
    question_text: "What is the most common cause of death in patients with diabetes mellitus?",
    options: [
      { id: '1', text: 'Diabetic ketoacidosis' },
      { id: '2', text: 'Cardiovascular disease' },
      { id: '3', text: 'Renal failure' },
      { id: '4', text: 'Hypoglycemia' }
    ],
    correct_option_id: '2',
    explanation: 'Cardiovascular disease is the leading cause of death in diabetic patients, accounting for about 65% of deaths.',
    category_id: 'subj_pathology',
    difficulty: 'easy',
  },
  {
    id: 'q20',
    question_text: "Which oncogene is most commonly associated with breast cancer?",
    options: [
      { id: '1', text: 'p53' },
      { id: '2', text: 'HER2/neu' },
      { id: '3', text: 'BRCA1' },
      { id: '4', text: 'RAS' }
    ],
    correct_option_id: '2',
    explanation: 'HER2/neu is overexpressed in about 20-25% of breast cancers and is associated with more aggressive disease.',
    category_id: 'subj_pathology',
    difficulty: 'hard',
  },
  {
    id: 'q81',
    question_text: "A patient with a history of alcoholism presents with confusion, ophthalmoplegia, and ataxia. This clinical triad is characteristic of which deficiency?",
    options: [
      { id: '1', text: 'Niacin (B3) deficiency' },
      { id: '2', text: 'Cobalamin (B12) deficiency' },
      { id: '3', text: 'Folate (B9) deficiency' },
      { id: '4', text: 'Thiamine (B1) deficiency' }
    ],
    correct_option_id: '4',
    explanation: 'The classic triad of Wernicke encephalopathy is confusion, ophthalmoplegia, and ataxia, caused by a deficiency in Thiamine (Vitamin B1).',
    category_id: 'subj_pathology',
    difficulty: 'hard',
  },

  // Biochemistry Questions (6 questions) - subj_biochemistry
  {
    id: 'q21',
    question_text: "Which enzyme is deficient in phenylketonuria (PKU)?",
    options: [
      { id: '1', text: 'Tyrosinase' },
      { id: '2', text: 'Phenylalanine hydroxylase' },
      { id: '3', text: 'Homogentisic acid oxidase' },
      { id: '4', text: 'Fumarylacetoacetate hydrolase' }
    ],
    correct_option_id: '2',
    explanation: 'PKU is caused by deficiency of phenylalanine hydroxylase, which converts phenylalanine to tyrosine.',
    category_id: 'subj_biochemistry',
    difficulty: 'easy',
  },
  {
    id: 'q22',
    question_text: "What is the rate-limiting enzyme in cholesterol synthesis?",
    options: [
      { id: '1', text: 'Acetyl-CoA carboxylase' },
      { id: '2', text: 'HMG-CoA reductase' },
      { id: '3', text: 'Fatty acid synthase' },
      { id: '4', text: 'Cholesterol esterase' }
    ],
    correct_option_id: '2',
    explanation: 'HMG-CoA reductase is the rate-limiting enzyme in cholesterol synthesis and is the target of statin medications.',
    category_id: 'subj_biochemistry',
    difficulty: 'medium',
  },
  {
    id: 'q23',
    question_text: "In glycolysis, which enzyme catalyzes the conversion of glucose to glucose-6-phosphate?",
    options: [
      { id: '1', text: 'Phosphoglucose isomerase' },
      { id: '2', text: 'Hexokinase' },
      { id: '3', text: 'Phosphofructokinase' },
      { id: '4', text: 'Pyruvate kinase' }
    ],
    correct_option_id: '2',
    explanation: 'Hexokinase catalyzes the first step of glycolysis, converting glucose to glucose-6-phosphate using ATP.',
    category_id: 'subj_biochemistry',
    difficulty: 'easy',
  },
  {
    id: 'q24',
    question_text: "Which vitamin deficiency causes scurvy?",
    options: [
      { id: '1', text: 'Vitamin B1 (Thiamine)' },
      { id: '2', text: 'Vitamin C (Ascorbic acid)' },
      { id: '3', text: 'Vitamin D' },
      { id: '4', text: 'Vitamin B12' }
    ],
    correct_option_id: '2',
    explanation: 'Scurvy is caused by vitamin C deficiency, leading to defective collagen synthesis.',
    category_id: 'subj_biochemistry',
    difficulty: 'easy',
  },
  {
    id: 'q25',
    question_text: "What is the primary function of the pentose phosphate pathway?",
    options: [
      { id: '1', text: 'ATP production' },
      { id: '2', text: 'NADPH production' },
      { id: '3', text: 'Lactate production' },
      { id: '4', text: 'Protein synthesis' }
    ],
    correct_option_id: '2',
    explanation: 'The pentose phosphate pathway primarily produces NADPH, which is essential for reductive biosynthesis and antioxidant defense.',
    category_id: 'subj_biochemistry',
    difficulty: 'medium',
  },
  {
    id: 'q26',
    question_text: "Which amino acid is the precursor for serotonin synthesis?",
    options: [
      { id: '1', text: 'Tyrosine' },
      { id: '2', text: 'Tryptophan' },
      { id: '3', text: 'Phenylalanine' },
      { id: '4', text: 'Histidine' }
    ],
    correct_option_id: '2',
    explanation: 'Tryptophan is the amino acid precursor for serotonin synthesis in the brain and other tissues.',
    category_id: 'subj_biochemistry',
    difficulty: 'medium',
  },

  // Microbiology Questions (6 questions) - subj_microbiology
  {
    id: 'q27',
    question_text: "Which organism is the most common cause of community-acquired pneumonia?",
    options: [
      { id: '1', text: 'Haemophilus influenzae' },
      { id: '2', text: 'Streptococcus pneumoniae' },
      { id: '3', text: 'Mycoplasma pneumoniae' },
      { id: '4', text: 'Legionella pneumophila' }
    ],
    correct_option_id: '2',
    explanation: 'Streptococcus pneumoniae (pneumococcus) is the most common cause of community-acquired pneumonia in adults.',
    category_id: 'subj_microbiology',
    difficulty: 'easy',
  },
  {
    id: 'q28',
    question_text: "What is the mechanism of action of penicillin?",
    options: [
      { id: '1', text: 'Inhibits protein synthesis' },
      { id: '2', text: 'Inhibits cell wall synthesis' },
      { id: '3', text: 'Inhibits DNA replication' },
      { id: '4', text: 'Disrupts cell membrane' }
    ],
    correct_option_id: '2',
    explanation: 'Penicillin inhibits bacterial cell wall synthesis by binding to penicillin-binding proteins and preventing peptidoglycan cross-linking.',
    category_id: 'subj_microbiology',
    difficulty: 'easy',
  },
  {
    id: 'q29',
    question_text: "Which virus is associated with Burkitt lymphoma?",
    options: [
      { id: '1', text: 'Human papillomavirus' },
      { id: '2', text: 'Epstein-Barr virus' },
      { id: '3', text: 'Cytomegalovirus' },
      { id: '4', text: 'Hepatitis B virus' }
    ],
    correct_option_id: '2',
    explanation: 'Epstein-Barr virus (EBV) is strongly associated with Burkitt lymphoma, particularly the endemic form found in Africa.',
    category_id: 'subj_microbiology',
    difficulty: 'medium',
  },
  {
    id: 'q30',
    question_text: "Which bacteria is the most common cause of urinary tract infections?",
    options: [
      { id: '1', text: 'Staphylococcus aureus' },
      { id: '2', text: 'Escherichia coli' },
      { id: '3', text: 'Enterococcus faecalis' },
      { id: '4', text: 'Pseudomonas aeruginosa' }
    ],
    correct_option_id: '2',
    explanation: 'Escherichia coli is responsible for approximately 80-85% of uncomplicated urinary tract infections.',
    category_id: 'subj_microbiology',
    difficulty: 'easy',
  },
  {
    id: 'q31',
    question_text: "Which fungal infection is most commonly seen in immunocompromised patients?",
    options: [
      { id: '1', text: 'Candida albicans' },
      { id: '2', text: 'Aspergillus fumigatus' },
      { id: '3', text: 'Cryptococcus neoformans' },
      { id: '4', text: 'Histoplasma capsulatum' }
    ],
    correct_option_id: '1',
    explanation: 'Candida albicans is the most common opportunistic fungal infection in immunocompromised patients.',
    category_id: 'subj_microbiology',
    difficulty: 'medium',
  },
  {
    id: 'q32',
    question_text: "Which test is used to differentiate Staphylococcus aureus from Staphylococcus epidermidis?",
    options: [
      { id: '1', text: 'Catalase test' },
      { id: '2', text: 'Coagulase test' },
      { id: '3', text: 'Oxidase test' },
      { id: '4', text: 'Indole test' }
    ],
    correct_option_id: '2',
    explanation: 'The coagulase test differentiates S. aureus (coagulase positive) from S. epidermidis (coagulase negative).',
    category_id: 'subj_microbiology',
    difficulty: 'medium',
  },

  // Anatomy Questions (7 questions) - subj_anatomy
  {
    id: 'q33',
    question_text: "Which nerve innervates the diaphragm?",
    options: [
      { id: '1', text: 'Vagus nerve' },
      { id: '2', text: 'Phrenic nerve' },
      { id: '3', text: 'Intercostal nerves' },
      { id: '4', text: 'Accessory nerve' }
    ],
    correct_option_id: '2',
    explanation: 'The phrenic nerve (C3-C5) provides motor innervation to the diaphragm. Remember: C3, 4, 5 keep the diaphragm alive.',
    category_id: 'subj_anatomy',
    difficulty: 'easy',
  },
  {
    id: 'q34',
    question_text: "What passes through the foramen ovale?",
    options: [
      { id: '1', text: 'Maxillary nerve (CN V2)' },
      { id: '2', text: 'Mandibular nerve (CN V3)' },
      { id: '3', text: 'Ophthalmic nerve (CN V1)' },
      { id: '4', text: 'Facial nerve (CN VII)' }
    ],
    correct_option_id: '2',
    explanation: 'The mandibular division of the trigeminal nerve (CN V3) passes through the foramen ovale.',
    category_id: 'subj_anatomy',
    difficulty: 'medium',
  },
  {
    id: 'q35',
    question_text: "Which muscle is responsible for abduction of the arm at the shoulder?",
    options: [
      { id: '1', text: 'Supraspinatus' },
      { id: '2', text: 'Deltoid' },
      { id: '3', text: 'Infraspinatus' },
      { id: '4', text: 'Teres minor' }
    ],
    correct_option_id: '2',
    explanation: 'The deltoid muscle is the primary abductor of the arm at the shoulder joint, with the supraspinatus initiating the movement.',
    category_id: 'subj_anatomy',
    difficulty: 'easy',
  },
  {
    id: 'q36',
    question_text: "Which bone forms the posterior wall of the orbit?",
    options: [
      { id: '1', text: 'Frontal bone' },
      { id: '2', text: 'Sphenoid bone' },
      { id: '3', text: 'Maxilla' },
      { id: '4', text: 'Zygomatic bone' }
    ],
    correct_option_id: '2',
    explanation: 'The sphenoid bone (greater wing) forms the posterior wall of the orbit.',
    category_id: 'subj_anatomy',
    difficulty: 'medium',
  },
  {
    id: 'q37',
    question_text: "How many cervical vertebrae are there in the human spine?",
    options: [
      { id: '1', text: '5' },
      { id: '2', text: '7' },
      { id: '3', text: '12' },
      { id: '4', text: '8' }
    ],
    correct_option_id: '2',
    explanation: 'There are 7 cervical vertebrae in the human spine, labeled C1 through C7.',
    category_id: 'subj_anatomy',
    difficulty: 'easy',
  },
  {
    id: 'q38',
    question_text: "Which artery supplies blood to the brain stem?",
    options: [
      { id: '1', text: 'Anterior cerebral artery' },
      { id: '2', text: 'Vertebrobasilar system' },
      { id: '3', text: 'Middle cerebral artery' },
      { id: '4', text: 'Posterior communicating artery' }
    ],
    correct_option_id: '2',
    explanation: 'The vertebrobasilar system (vertebral and basilar arteries) supplies blood to the brain stem.',
    category_id: 'subj_anatomy',
    difficulty: 'medium',
  },
  {
    id: 'q80',
    question_text: "Which type of blood vessel carries oxygenated blood away from the heart?",
    options: [
      { id: '1', text: 'Vein' },
      { id: '2', text: 'Artery' },
      { id: '3', text: 'Capillary' },
      { id: '4', text: 'Venule' }
    ],
    correct_option_id: '2',
    explanation: 'Arteries are blood vessels that carry oxygen-rich blood from the heart to all other parts of the body, with the exception of the pulmonary artery.',
    category_id: 'subj_anatomy',
    difficulty: 'easy',
  },

  // Physiology Questions (6 questions) - subj_physiology
  {
    id: 'q39',
    question_text: "What is the normal resting membrane potential of a cardiac myocyte?",
    options: [
      { id: '1', text: '-70 mV' },
      { id: '2', text: '-90 mV' },
      { id: '3', text: '-55 mV' },
      { id: '4', text: '-40 mV' }
    ],
    correct_option_id: '2',
    explanation: 'The resting membrane potential of cardiac myocytes is approximately -90 mV, which is more negative than skeletal muscle due to higher K+ permeability.',
    category_id: 'subj_physiology',
    difficulty: 'medium',
  },
  {
    id: 'q40',
    question_text: "Which hormone is primarily responsible for calcium homeostasis?",
    options: [
      { id: '1', text: 'Calcitonin' },
      { id: '2', text: 'Parathyroid hormone (PTH)' },
      { id: '3', text: 'Vitamin D' },
      { id: '4', text: 'Growth hormone' }
    ],
    correct_option_id: '2',
    explanation: 'Parathyroid hormone (PTH) is the primary regulator of calcium homeostasis, increasing serum calcium through multiple mechanisms.',
    category_id: 'subj_physiology',
    difficulty: 'easy',
  },
  {
    id: 'q41',
    question_text: "What is the primary site of erythropoietin production?",
    options: [
      { id: '1', text: 'Bone marrow' },
      { id: '2', text: 'Liver' },
      { id: '3', text: 'Kidneys' },
      { id: '4', text: 'Spleen' }
    ],
    correct_option_id: '3',
    explanation: 'Erythropoietin is primarily produced by the kidneys in response to hypoxia, stimulating red blood cell production in the bone marrow.',
    category_id: 'subj_physiology',
    difficulty: 'easy',
  },
  {
    id: 'q42',
    question_text: "What is the normal pH range of arterial blood?",
    options: [
      { id: '1', text: '7.25-7.35' },
      { id: '2', text: '7.35-7.45' },
      { id: '3', text: '7.45-7.55' },
      { id: '4', text: '7.30-7.40' }
    ],
    correct_option_id: '2',
    explanation: 'Normal arterial blood pH is 7.35-7.45. Values below 7.35 indicate acidemia, and values above 7.45 indicate alkalemia.',
    category_id: 'subj_physiology',
    difficulty: 'easy',
  },
  {
    id: 'q43',
    question_text: "Which phase of the cardiac cycle takes up the most time?",
    options: [
      { id: '1', text: 'Systole' },
      { id: '2', text: 'Diastole' },
      { id: '3', text: 'Isovolumetric contraction' },
      { id: '4', text: 'Isovolumetric relaxation' }
    ],
    correct_option_id: '2',
    explanation: 'Diastole (ventricular filling) takes up approximately 2/3 of the cardiac cycle at normal heart rates.',
    category_id: 'subj_physiology',
    difficulty: 'medium',
  },
  {
    id: 'q44',
    question_text: "What is the primary driver of venous return to the heart?",
    options: [
      { id: '1', text: 'Cardiac suction' },
      { id: '2', text: 'Pressure gradient' },
      { id: '3', text: 'Skeletal muscle pump' },
      { id: '4', text: 'Respiratory pump' }
    ],
    correct_option_id: '2',
    explanation: 'The pressure gradient between peripheral venous pressure and central venous pressure is the primary driver of venous return.',
    category_id: 'subj_physiology',
    difficulty: 'medium',
  },

  // Immunology Questions (6 questions) - subj_immunology
  {
    id: 'q45',
    question_text: "Which immunoglobulin is most abundant in serum?",
    options: [
      { id: '1', text: 'IgA' },
      { id: '2', text: 'IgG' },
      { id: '3', text: 'IgM' },
      { id: '4', text: 'IgE' }
    ],
    correct_option_id: '2',
    explanation: 'IgG is the most abundant immunoglobulin in serum, comprising about 75% of total serum immunoglobulins.',
    category_id: 'subj_immunology',
    difficulty: 'easy',
  },
  {
    id: 'q46',
    question_text: "Which cells are primarily responsible for cell-mediated immunity?",
    options: [
      { id: '1', text: 'B cells' },
      { id: '2', text: 'T cells' },
      { id: '3', text: 'Natural killer cells' },
      { id: '4', text: 'Macrophages' }
    ],
    correct_option_id: '2',
    explanation: 'T cells, particularly CD8+ cytotoxic T cells and CD4+ helper T cells, are the primary mediators of cell-mediated immunity.',
    category_id: 'subj_immunology',
    difficulty: 'easy',
  },
  {
    id: 'q47',
    question_text: "What is the function of complement protein C3b?",
    options: [
      { id: '1', text: 'Membrane attack complex formation' },
      { id: '2', text: 'Opsonization' },
      { id: '3', text: 'Chemotaxis' },
      { id: '4', text: 'Anaphylatoxin activity' }
    ],
    correct_option_id: '2',
    explanation: 'C3b is a major opsonin that coats pathogens and facilitates their recognition and phagocytosis by immune cells.',
    category_id: 'subj_immunology',
    difficulty: 'medium',
  },
  {
    id: 'q48',
    question_text: "Which cytokine is primarily responsible for fever induction?",
    options: [
      { id: '1', text: 'TNF-α' },
      { id: '2', text: 'IL-1β' },
      { id: '3', text: 'IL-6' },
      { id: '4', text: 'All of the above' }
    ],
    correct_option_id: '4',
    explanation: 'TNF-α, IL-1β, and IL-6 are all pyrogenic cytokines that can induce fever by acting on the hypothalamus.',
    category_id: 'subj_immunology',
    difficulty: 'medium',
  },
  {
    id: 'q49',
    question_text: "What type of hypersensitivity reaction is anaphylaxis?",
    options: [
      { id: '1', text: 'Type I' },
      { id: '2', text: 'Type II' },
      { id: '3', text: 'Type III' },
      { id: '4', text: 'Type IV' }
    ],
    correct_option_id: '1',
    explanation: 'Anaphylaxis is a Type I (immediate) hypersensitivity reaction mediated by IgE antibodies and mast cell degranulation.',
    category_id: 'subj_immunology',
    difficulty: 'easy',
  },
  {
    id: 'q50',
    question_text: "Which organ is considered the primary lymphoid organ for T cell maturation?",
    options: [
      { id: '1', text: 'Bone marrow' },
      { id: '2', text: 'Thymus' },
      { id: '3', text: 'Spleen' },
      { id: '4', text: 'Lymph nodes' }
    ],
    correct_option_id: '2',
    explanation: 'The thymus is the primary lymphoid organ where T cells mature and undergo positive and negative selection.',
    category_id: 'subj_immunology',
    difficulty: 'easy',
  },

  // Neurology Questions (6 questions) - sys_nervous
  {
    id: 'q51',
    question_text: "Which neurotransmitter is deficient in Parkinson disease?",
    options: [
      { id: '1', text: 'Acetylcholine' },
      { id: '2', text: 'Dopamine' },
      { id: '3', text: 'Serotonin' },
      { id: '4', text: 'GABA' }
    ],
    correct_option_id: '2',
    explanation: 'Parkinson disease is characterized by the loss of dopaminergic neurons in the substantia nigra, leading to dopamine deficiency.',
    category_id: 'sys_nervous',
    difficulty: 'easy',
  },
  {
    id: 'q52',
    question_text: "What is the most common cause of subarachnoid hemorrhage?",
    options: [
      { id: '1', text: 'Hypertension' },
      { id: '2', text: 'Ruptured aneurysm' },
      { id: '3', text: 'Arteriovenous malformation' },
      { id: '4', text: 'Trauma' }
    ],
    correct_option_id: '2',
    explanation: 'Ruptured cerebral aneurysms account for approximately 85% of spontaneous subarachnoid hemorrhages.',
    category_id: 'sys_nervous',
    difficulty: 'medium',
  },
  {
    id: 'q53',
    question_text: "Which cranial nerve is affected in Bell palsy?",
    options: [
      { id: '1', text: 'Trigeminal nerve (CN V)' },
      { id: '2', text: 'Facial nerve (CN VII)' },
      { id: '3', text: 'Glossopharyngeal nerve (CN IX)' },
      { id: '4', text: 'Hypoglossal nerve (CN XII)' }
    ],
    correct_option_id: '2',
    explanation: 'Bell palsy is an idiopathic facial nerve (CN VII) palsy causing unilateral facial weakness.',
    category_id: 'sys_nervous',
    difficulty: 'easy',
  },
  {
    id: 'q54',
    question_text: "What is the most common type of stroke?",
    options: [
      { id: '1', text: 'Hemorrhagic stroke' },
      { id: '2', text: 'Ischemic stroke' },
      { id: '3', text: 'Transient ischemic attack' },
      { id: '4', text: 'Subarachnoid hemorrhage' }
    ],
    correct_option_id: '2',
    explanation: 'Ischemic stroke accounts for approximately 85% of all strokes, caused by blockage of blood flow to the brain.',
    category_id: 'sys_nervous',
    difficulty: 'easy',
  },
  {
    id: 'q55',
    question_text: "Which area of the brain is primarily affected in Broca aphasia?",
    options: [
      { id: '1', text: 'Wernicke area' },
      { id: '2', text: 'Broca area' },
      { id: '3', text: 'Angular gyrus' },
      { id: '4', text: 'Arcuate fasciculus' }
    ],
    correct_option_id: '2',
    explanation: 'Broca aphasia results from damage to Broca area in the frontal lobe, causing difficulty with speech production.',
    category_id: 'sys_nervous',
    difficulty: 'medium',
  },
  {
    id: 'q56',
    question_text: "What is the classic triad of normal pressure hydrocephalus?",
    options: [
      { id: '1', text: 'Headache, nausea, vomiting' },
      { id: '2', text: 'Gait disturbance, urinary incontinence, dementia' },
      { id: '3', text: 'Tremor, rigidity, bradykinesia' },
      { id: '4', text: 'Aphasia, apraxia, agnosia' }
    ],
    correct_option_id: '2',
    explanation: 'Normal pressure hydrocephalus presents with the classic triad of gait disturbance, urinary incontinence, and dementia.',
    category_id: 'sys_nervous',
    difficulty: 'hard',
  },

  // Endocrinology Questions (6 questions) - sys_endocrine
  {
    id: 'q57',
    question_text: "What is the most common cause of hyperthyroidism?",
    options: [
      { id: '1', text: 'Toxic multinodular goiter' },
      { id: '2', text: 'Graves disease' },
      { id: '3', text: 'Thyroiditis' },
      { id: '4', text: 'Thyroid adenoma' }
    ],
    correct_option_id: '2',
    explanation: 'Graves disease is the most common cause of hyperthyroidism, accounting for 70-80% of cases.',
    category_id: 'sys_endocrine',
    difficulty: 'easy',
  },
  {
    id: 'q58',
    question_text: "Which hormone is elevated in Cushing syndrome?",
    options: [
      { id: '1', text: 'Growth hormone' },
      { id: '2', text: 'Cortisol' },
      { id: '3', text: 'Aldosterone' },
      { id: '4', text: 'Insulin' }
    ],
    correct_option_id: '2',
    explanation: 'Cushing syndrome is characterized by chronic elevation of cortisol levels, either from endogenous overproduction or exogenous administration.',
    category_id: 'sys_endocrine',
    difficulty: 'easy',
  },
  {
    id: 'q59',
    question_text: "What is the target HbA1c level for most diabetic patients?",
    options: [
      { id: '1', text: 'Less than 6%' },
      { id: '2', text: 'Less than 7%' },
      { id: '3', text: 'Less than 8%' },
      { id: '4', text: 'Less than 9%' }
    ],
    correct_option_id: '2',
    explanation: 'The American Diabetes Association recommends an HbA1c target of less than 7% for most non-pregnant adults with diabetes.',
    category_id: 'sys_endocrine',
    difficulty: 'easy',
  },
  {
    id: 'q60',
    question_text: "Which test is used to diagnose diabetes insipidus?",
    options: [
      { id: '1', text: 'Glucose tolerance test' },
      { id: '2', text: 'Water deprivation test' },
      { id: '3', text: 'Dexamethasone suppression test' },
      { id: '4', text: 'Thyroid function tests' }
    ],
    correct_option_id: '2',
    explanation: 'The water deprivation test is used to diagnose diabetes insipidus by assessing the ability to concentrate urine.',
    category_id: 'sys_endocrine',
    difficulty: 'medium',
  },
  {
    id: 'q61',
    question_text: "What is the most common cause of primary hyperaldosteronism?",
    options: [
      { id: '1', text: 'Adrenal adenoma' },
      { id: '2', text: 'Bilateral adrenal hyperplasia' },
      { id: '3', text: 'Adrenal carcinoma' },
      { id: '4', text: 'Ectopic ACTH syndrome' }
    ],
    correct_option_id: '2',
    explanation: 'Bilateral adrenal hyperplasia is the most common cause of primary hyperaldosteronism (Conn syndrome).',
    category_id: 'sys_endocrine',
    difficulty: 'medium',
  },
  {
    id: 'q62',
    question_text: "Which hormone deficiency causes diabetes insipidus?",
    options: [
      { id: '1', text: 'Insulin' },
      { id: '2', text: 'Antidiuretic hormone (ADH)' },
      { id: '3', text: 'Growth hormone' },
      { id: '4', text: 'Thyroid hormone' }
    ],
    correct_option_id: '2',
    explanation: 'Central diabetes insipidus is caused by deficiency of antidiuretic hormone (ADH/vasopressin) from the posterior pituitary.',
    category_id: 'sys_endocrine',
    difficulty: 'easy',
  },

  // Gastroenterology Questions (6 questions) - sys_gi
  {
    id: 'q63',
    question_text: "What is the most common cause of peptic ulcer disease?",
    options: [
      { id: '1', text: 'NSAIDs' },
      { id: '2', text: 'Helicobacter pylori' },
      { id: '3', text: 'Stress' },
      { id: '4', text: 'Alcohol' }
    ],
    correct_option_id: '2',
    explanation: 'Helicobacter pylori infection is the most common cause of peptic ulcer disease, followed by NSAID use.',
    category_id: 'sys_gi',
    difficulty: 'easy',
  },
  {
    id: 'q64',
    question_text: "Which liver enzyme is most specific for hepatocellular injury?",
    options: [
      { id: '1', text: 'ALT' },
      { id: '2', text: 'AST' },
      { id: '3', text: 'Alkaline phosphatase' },
      { id: '4', text: 'GGT' }
    ],
    correct_option_id: '1',
    explanation: 'ALT (alanine aminotransferase) is more specific for hepatocellular injury than AST, as it is found primarily in the liver.',
    category_id: 'sys_gi',
    difficulty: 'medium',
  },
  {
    id: 'q65',
    question_text: "What is the gold standard for diagnosing celiac disease?",
    options: [
      { id: '1', text: 'Anti-gliadin antibodies' },
      { id: '2', text: 'Small bowel biopsy' },
      { id: '3', text: 'Anti-tissue transglutaminase antibodies' },
      { id: '4', text: 'HLA typing' }
    ],
    correct_option_id: '2',
    explanation: 'Small bowel biopsy showing villous atrophy remains the gold standard for diagnosing celiac disease, though serology is often used for screening.',
    category_id: 'sys_gi',
    difficulty: 'medium',
  },
  {
    id: 'q66',
    question_text: "Which condition is associated with the highest risk of colorectal cancer?",
    options: [
      { id: '1', text: 'Ulcerative colitis' },
      { id: '2', text: 'Crohn disease' },
      { id: '3', text: 'Familial adenomatous polyposis' },
      { id: '4', text: 'Diverticulosis' }
    ],
    correct_option_id: '3',
    explanation: 'Familial adenomatous polyposis (FAP) has nearly 100% risk of developing colorectal cancer if untreated.',
    category_id: 'sys_gi',
    difficulty: 'hard',
  },
  {
    id: 'q67',
    question_text: "What is the most common cause of acute pancreatitis?",
    options: [
      { id: '1', text: 'Alcohol' },
      { id: '2', text: 'Gallstones' },
      { id: '3', text: 'Medications' },
      { id: '4', text: 'Trauma' }
    ],
    correct_option_id: '2',
    explanation: 'Gallstones are the most common cause of acute pancreatitis, followed by alcohol consumption.',
    category_id: 'sys_gi',
    difficulty: 'easy',
  },
  {
    id: 'q68',
    question_text: "Which test is most sensitive for detecting pancreatic cancer?",
    options: [
      { id: '1', text: 'CT scan' },
      { id: '2', text: 'MRI' },
      { id: '3', text: 'Endoscopic ultrasound' },
      { id: '4', text: 'PET scan' }
    ],
    correct_option_id: '3',
    explanation: 'Endoscopic ultrasound (EUS) is the most sensitive imaging modality for detecting small pancreatic tumors.',
    category_id: 'sys_gi',
    difficulty: 'medium',
  },

  // Nephrology Questions (6 questions) - sys_renal
  {
    id: 'q69',
    question_text: "What is the most common cause of chronic kidney disease?",
    options: [
      { id: '1', text: 'Hypertension' },
      { id: '2', text: 'Diabetes mellitus' },
      { id: '3', text: 'Glomerulonephritis' },
      { id: '4', text: 'Polycystic kidney disease' }
    ],
    correct_option_id: '2',
    explanation: 'Diabetes mellitus is the leading cause of chronic kidney disease, accounting for approximately 40% of cases.',
    category_id: 'sys_renal',
    difficulty: 'easy',
  },
  {
    id: 'q70',
    question_text: "Which electrolyte abnormality is most commonly seen in chronic kidney disease?",
    options: [
      { id: '1', text: 'Hypernatremia' },
      { id: '2', text: 'Hyperkalemia' },
      { id: '3', text: 'Hypercalcemia' },
      { id: '4', text: 'Hypermagnesemia' }
    ],
    correct_option_id: '2',
    explanation: 'Hyperkalemia is commonly seen in chronic kidney disease due to decreased potassium excretion by the kidneys.',
    category_id: 'sys_renal',
    difficulty: 'easy',
  },
  {
    id: 'q71',
    question_text: "What is the normal glomerular filtration rate (GFR)?",
    options: [
      { id: '1', text: '60-89 mL/min/1.73m²' },
      { id: '2', text: '90-120 mL/min/1.73m²' },
      { id: '3', text: '30-59 mL/min/1.73m²' },
      { id: '4', text: '15-29 mL/min/1.73m²' }
    ],
    correct_option_id: '2',
    explanation: 'Normal GFR is 90-120 mL/min/1.73m². Values below 60 mL/min/1.73m² for 3 months or more indicate chronic kidney disease.',
    category_id: 'sys_renal',
    difficulty: 'medium',
  },
  {
    id: 'q72',
    question_text: "Which type of kidney stone is most common?",
    options: [
      { id: '1', text: 'Uric acid' },
      { id: '2', text: 'Calcium oxalate' },
      { id: '3', text: 'Struvite' },
      { id: '4', text: 'Cystine' }
    ],
    correct_option_id: '2',
    explanation: 'Calcium oxalate stones are the most common type of kidney stones, accounting for about 80% of all stones.',
    category_id: 'sys_renal',
    difficulty: 'easy',
  },
  {
    id: 'q73',
    question_text: "What is the most common cause of nephrotic syndrome in adults?",
    options: [
      { id: '1', text: 'Minimal change disease' },
      { id: '2', text: 'Focal segmental glomerulosclerosis' },
      { id: '3', text: 'Membranous nephropathy' },
      { id: '4', text: 'Diabetic nephropathy' }
    ],
    correct_option_id: '3',
    explanation: 'Membranous nephropathy is the most common cause of primary nephrotic syndrome in adults.',
    category_id: 'sys_renal',
    difficulty: 'medium',
  },
  {
    id: 'q74',
    question_text: "Which medication is contraindicated in patients with severe kidney disease?",
    options: [
      { id: '1', text: 'Acetaminophen' },
      { id: '2', text: 'Metformin' },
      { id: '3', text: 'Aspirin' },
      { id: '4', text: 'Furosemide' }
    ],
    correct_option_id: '2',
    explanation: 'Metformin is contraindicated in severe kidney disease due to the risk of lactic acidosis.',
    category_id: 'sys_renal',
    difficulty: 'medium',
  }
];