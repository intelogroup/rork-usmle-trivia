export interface Question {
  id: string;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  created_at: string;
  updated_at: string;
}

export const questions: Question[] = [
  // Cardiology Questions (8 questions)
  {
    id: 'q1',
    question: "A 65-year-old male presents with crushing chest pain. ECG shows ST-segment elevation in leads II, III, and aVF. Which coronary artery is most likely occluded?",
    options: [
      'Left Anterior Descending (LAD)',
      'Right Coronary Artery (RCA)',
      'Left Circumflex (LCX)',
      'Left Main Coronary Artery'
    ],
    correct: 1,
    explanation: 'ST elevation in the inferior leads (II, III, aVF) points to an inferior wall myocardial infarction, which is most commonly caused by occlusion of the Right Coronary Artery (RCA).',
    category: 'cardiology',
    difficulty: 'medium',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'q2',
    question: "What is the most common cause of heart failure in developed countries?",
    options: [
      'Hypertension',
      'Coronary artery disease',
      'Valvular disease',
      'Cardiomyopathy'
    ],
    correct: 1,
    explanation: 'Coronary artery disease is the leading cause of heart failure in developed countries, accounting for approximately 60-70% of cases.',
    category: 'cardiology',
    difficulty: 'easy',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'q3',
    question: "A patient presents with a harsh systolic murmur that increases with Valsalva maneuver. What is the most likely diagnosis?",
    options: [
      'Aortic stenosis',
      'Mitral regurgitation',
      'Hypertrophic cardiomyopathy',
      'Ventricular septal defect'
    ],
    correct: 2,
    explanation: 'Hypertrophic cardiomyopathy is characterized by a systolic murmur that increases with maneuvers that decrease preload (like Valsalva), unlike most other murmurs.',
    category: 'cardiology',
    difficulty: 'hard',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'q4',
    question: "Which medication is contraindicated in patients with severe aortic stenosis?",
    options: [
      'Beta-blockers',
      'ACE inhibitors',
      'Nitroglycerin',
      'Calcium channel blockers'
    ],
    correct: 2,
    explanation: 'Nitroglycerin can cause dangerous hypotension in patients with severe aortic stenosis by reducing preload in a fixed-output state.',
    category: 'cardiology',
    difficulty: 'medium',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'q5',
    question: "What is the normal ejection fraction range for the left ventricle?",
    options: [
      '40-50%',
      '50-70%',
      '70-80%',
      '30-40%'
    ],
    correct: 1,
    explanation: 'Normal left ventricular ejection fraction is typically 50-70%. Values below 40% indicate systolic dysfunction.',
    category: 'cardiology',
    difficulty: 'easy',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'q6',
    question: "Which arrhythmia is most commonly associated with Wolff-Parkinson-White syndrome?",
    options: [
      'Atrial fibrillation',
      'Atrioventricular reentrant tachycardia (AVRT)',
      'Ventricular tachycardia',
      'Atrial flutter'
    ],
    correct: 1,
    explanation: 'AVRT is the most common arrhythmia in WPW syndrome, caused by reentry through the accessory pathway.',
    category: 'cardiology',
    difficulty: 'hard',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'q7',
    question: "What is the first-line treatment for stable angina?",
    options: [
      'Calcium channel blockers',
      'Beta-blockers',
      'Nitrates',
      'ACE inhibitors'
    ],
    correct: 1,
    explanation: 'Beta-blockers are first-line therapy for stable angina as they reduce heart rate and myocardial oxygen demand.',
    category: 'cardiology',
    difficulty: 'easy',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'q8',
    question: "Which finding on echocardiogram is pathognomonic for cardiac tamponade?",
    options: [
      'Pericardial effusion',
      'Ventricular interdependence',
      'Reduced ejection fraction',
      'Mitral regurgitation'
    ],
    correct: 1,
    explanation: 'Ventricular interdependence (respiratory variation in ventricular filling) is the hallmark echocardiographic finding in cardiac tamponade.',
    category: 'cardiology',
    difficulty: 'hard',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },

  // Pharmacology Questions (7 questions)
  {
    id: 'q9',
    question: "Which of the following diuretics works by inhibiting the Na-K-2Cl cotransporter in the thick ascending loop of Henle?",
    options: [
      'Hydrochlorothiazide',
      'Spironolactone',
      'Furosemide',
      'Acetazolamide'
    ],
    correct: 2,
    explanation: 'Loop diuretics, such as Furosemide, exert their effect by inhibiting the Na-K-2Cl cotransporter in the thick ascending limb of the Loop of Henle.',
    category: 'pharmacology',
    difficulty: 'easy',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'q10',
    question: "What is the mechanism of action of ACE inhibitors?",
    options: [
      'Block angiotensin II receptors',
      'Inhibit conversion of angiotensin I to angiotensin II',
      'Block calcium channels',
      'Inhibit renin release'
    ],
    correct: 1,
    explanation: 'ACE inhibitors work by blocking the angiotensin-converting enzyme, preventing the conversion of angiotensin I to angiotensin II.',
    category: 'pharmacology',
    difficulty: 'easy',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'q11',
    question: "Which cytochrome P450 enzyme is responsible for metabolizing warfarin?",
    options: [
      'CYP2D6',
      'CYP3A4',
      'CYP2C9',
      'CYP1A2'
    ],
    correct: 2,
    explanation: 'Warfarin is primarily metabolized by CYP2C9. Genetic polymorphisms in this enzyme can significantly affect warfarin dosing requirements.',
    category: 'pharmacology',
    difficulty: 'hard',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'q12',
    question: "Which medication requires monitoring of serum levels due to a narrow therapeutic window?",
    options: [
      'Amoxicillin',
      'Digoxin',
      'Ibuprofen',
      'Metformin'
    ],
    correct: 1,
    explanation: 'Digoxin has a narrow therapeutic window and requires regular monitoring of serum levels to prevent toxicity.',
    category: 'pharmacology',
    difficulty: 'medium',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'q13',
    question: "What is the antidote for acetaminophen overdose?",
    options: [
      'Naloxone',
      'N-acetylcysteine',
      'Flumazenil',
      'Atropine'
    ],
    correct: 1,
    explanation: 'N-acetylcysteine is the specific antidote for acetaminophen overdose, working by replenishing glutathione stores.',
    category: 'pharmacology',
    difficulty: 'medium',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'q14',
    question: "Which class of antibiotics is contraindicated in children due to effects on developing cartilage?",
    options: [
      'Penicillins',
      'Macrolides',
      'Fluoroquinolones',
      'Cephalosporins'
    ],
    correct: 2,
    explanation: 'Fluoroquinolones are contraindicated in children because they can affect developing cartilage and cause arthropathy.',
    category: 'pharmacology',
    difficulty: 'medium',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'q82',
    question: "What is the primary mechanism of action for statin drugs?",
    options: [
      'Inhibiting bile acid reabsorption',
      'Decreasing triglyceride synthesis',
      'Inhibiting HMG-CoA reductase',
      'Increasing lipoprotein lipase activity'
    ],
    correct: 2,
    explanation: 'Statins work by inhibiting HMG-CoA reductase, which is the rate-limiting enzyme in hepatic cholesterol synthesis.',
    category: 'pharmacology',
    difficulty: 'medium',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },

  // Pathology Questions (7 questions)
  {
    id: 'q15',
    question: "What is the most common type of lung cancer?",
    options: [
      'Squamous cell carcinoma',
      'Adenocarcinoma',
      'Small cell lung cancer',
      'Large cell carcinoma'
    ],
    correct: 1,
    explanation: 'Adenocarcinoma is now the most common type of lung cancer, accounting for about 40% of all lung cancers, and is more common in non-smokers.',
    category: 'pathology',
    difficulty: 'easy',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'q16',
    question: "Which tumor marker is most specific for hepatocellular carcinoma?",
    options: [
      'CEA',
      'CA 19-9',
      'Alpha-fetoprotein (AFP)',
      'PSA'
    ],
    correct: 2,
    explanation: 'Alpha-fetoprotein (AFP) is the most specific tumor marker for hepatocellular carcinoma, though it can also be elevated in other liver diseases.',
    category: 'pathology',
    difficulty: 'medium',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'q17',
    question: "What is the characteristic microscopic finding in Alzheimer disease?",
    options: [
      'Lewy bodies',
      'Neurofibrillary tangles and amyloid plaques',
      'Pick bodies',
      'Hirano bodies'
    ],
    correct: 1,
    explanation: 'Alzheimer disease is characterized by the presence of neurofibrillary tangles (tau protein) and amyloid plaques (beta-amyloid protein) in the brain.',
    category: 'pathology',
    difficulty: 'medium',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'q18',
    question: "Which type of necrosis is characteristic of myocardial infarction?",
    options: [
      'Caseous necrosis',
      'Coagulative necrosis',
      'Liquefactive necrosis',
      'Fat necrosis'
    ],
    correct: 1,
    explanation: 'Coagulative necrosis is the characteristic type of cell death in myocardial infarction, where tissue architecture is preserved.',
    category: 'pathology',
    difficulty: 'medium',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'q19',
    question: "What is the most common cause of death in patients with diabetes mellitus?",
    options: [
      'Diabetic ketoacidosis',
      'Cardiovascular disease',
      'Renal failure',
      'Hypoglycemia'
    ],
    correct: 1,
    explanation: 'Cardiovascular disease is the leading cause of death in diabetic patients, accounting for about 65% of deaths.',
    category: 'pathology',
    difficulty: 'easy',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'q20',
    question: "Which oncogene is most commonly associated with breast cancer?",
    options: [
      'p53',
      'HER2/neu',
      'BRCA1',
      'RAS'
    ],
    correct: 1,
    explanation: 'HER2/neu is overexpressed in about 20-25% of breast cancers and is associated with more aggressive disease.',
    category: 'pathology',
    difficulty: 'hard',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'q81',
    question: "A patient with a history of alcoholism presents with confusion, ophthalmoplegia, and ataxia. This clinical triad is characteristic of which deficiency?",
    options: [
      'Niacin (B3) deficiency',
      'Cobalamin (B12) deficiency',
      'Folate (B9) deficiency',
      'Thiamine (B1) deficiency'
    ],
    correct: 3,
    explanation: 'The classic triad of Wernicke encephalopathy is confusion, ophthalmoplegia, and ataxia, caused by a deficiency in Thiamine (Vitamin B1).',
    category: 'pathology',
    difficulty: 'hard',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },

  // Biochemistry Questions (6 questions)
  {
    id: 'q21',
    question: "Which enzyme is deficient in phenylketonuria (PKU)?",
    options: [
      'Tyrosinase',
      'Phenylalanine hydroxylase',
      'Homogentisic acid oxidase',
      'Fumarylacetoacetate hydrolase'
    ],
    correct: 1,
    explanation: 'PKU is caused by deficiency of phenylalanine hydroxylase, which converts phenylalanine to tyrosine.',
    category: 'biochemistry',
    difficulty: 'easy',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'q22',
    question: "What is the rate-limiting enzyme in cholesterol synthesis?",
    options: [
      'Acetyl-CoA carboxylase',
      'HMG-CoA reductase',
      'Fatty acid synthase',
      'Cholesterol esterase'
    ],
    correct: 1,
    explanation: 'HMG-CoA reductase is the rate-limiting enzyme in cholesterol synthesis and is the target of statin medications.',
    category: 'biochemistry',
    difficulty: 'medium',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'q23',
    question: "In glycolysis, which enzyme catalyzes the conversion of glucose to glucose-6-phosphate?",
    options: [
      'Phosphoglucose isomerase',
      'Hexokinase',
      'Phosphofructokinase',
      'Pyruvate kinase'
    ],
    correct: 1,
    explanation: 'Hexokinase catalyzes the first step of glycolysis, converting glucose to glucose-6-phosphate using ATP.',
    category: 'biochemistry',
    difficulty: 'easy',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'q24',
    question: "Which vitamin deficiency causes scurvy?",
    options: [
      'Vitamin B1 (Thiamine)',
      'Vitamin C (Ascorbic acid)',
      'Vitamin D',
      'Vitamin B12'
    ],
    correct: 1,
    explanation: 'Scurvy is caused by vitamin C deficiency, leading to defective collagen synthesis.',
    category: 'biochemistry',
    difficulty: 'easy',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'q25',
    question: "What is the primary function of the pentose phosphate pathway?",
    options: [
      'ATP production',
      'NADPH production',
      'Lactate production',
      'Protein synthesis'
    ],
    correct: 1,
    explanation: 'The pentose phosphate pathway primarily produces NADPH, which is essential for reductive biosynthesis and antioxidant defense.',
    category: 'biochemistry',
    difficulty: 'medium',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'q26',
    question: "Which amino acid is the precursor for serotonin synthesis?",
    options: [
      'Tyrosine',
      'Tryptophan',
      'Phenylalanine',
      'Histidine'
    ],
    correct: 1,
    explanation: 'Tryptophan is the amino acid precursor for serotonin synthesis in the brain and other tissues.',
    category: 'biochemistry',
    difficulty: 'medium',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },

  // Microbiology Questions (6 questions)
  {
    id: 'q27',
    question: "Which organism is the most common cause of community-acquired pneumonia?",
    options: [
      'Haemophilus influenzae',
      'Streptococcus pneumoniae',
      'Mycoplasma pneumoniae',
      'Legionella pneumophila'
    ],
    correct: 1,
    explanation: 'Streptococcus pneumoniae (pneumococcus) is the most common cause of community-acquired pneumonia in adults.',
    category: 'microbiology',
    difficulty: 'easy',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'q28',
    question: "What is the mechanism of action of penicillin?",
    options: [
      'Inhibits protein synthesis',
      'Inhibits cell wall synthesis',
      'Inhibits DNA replication',
      'Disrupts cell membrane'
    ],
    correct: 1,
    explanation: 'Penicillin inhibits bacterial cell wall synthesis by binding to penicillin-binding proteins and preventing peptidoglycan cross-linking.',
    category: 'microbiology',
    difficulty: 'easy',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'q29',
    question: "Which virus is associated with Burkitt lymphoma?",
    options: [
      'Human papillomavirus',
      'Epstein-Barr virus',
      'Cytomegalovirus',
      'Hepatitis B virus'
    ],
    correct: 1,
    explanation: 'Epstein-Barr virus (EBV) is strongly associated with Burkitt lymphoma, particularly the endemic form found in Africa.',
    category: 'microbiology',
    difficulty: 'medium',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'q30',
    question: "Which bacteria is the most common cause of urinary tract infections?",
    options: [
      'Staphylococcus aureus',
      'Escherichia coli',
      'Enterococcus faecalis',
      'Pseudomonas aeruginosa'
    ],
    correct: 1,
    explanation: 'Escherichia coli is responsible for approximately 80-85% of uncomplicated urinary tract infections.',
    category: 'microbiology',
    difficulty: 'easy',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'q31',
    question: "Which fungal infection is most commonly seen in immunocompromised patients?",
    options: [
      'Candida albicans',
      'Aspergillus fumigatus',
      'Cryptococcus neoformans',
      'Histoplasma capsulatum'
    ],
    correct: 0,
    explanation: 'Candida albicans is the most common opportunistic fungal infection in immunocompromised patients.',
    category: 'microbiology',
    difficulty: 'medium',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'q32',
    question: "Which test is used to differentiate Staphylococcus aureus from Staphylococcus epidermidis?",
    options: [
      'Catalase test',
      'Coagulase test',
      'Oxidase test',
      'Indole test'
    ],
    correct: 1,
    explanation: 'The coagulase test differentiates S. aureus (coagulase positive) from S. epidermidis (coagulase negative).',
    category: 'microbiology',
    difficulty: 'medium',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },

  // Anatomy Questions (7 questions)
  {
    id: 'q33',
    question: "Which nerve innervates the diaphragm?",
    options: [
      'Vagus nerve',
      'Phrenic nerve',
      'Intercostal nerves',
      'Accessory nerve'
    ],
    correct: 1,
    explanation: 'The phrenic nerve (C3-C5) provides motor innervation to the diaphragm. Remember: C3, 4, 5 keep the diaphragm alive.',
    category: 'anatomy',
    difficulty: 'easy',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'q34',
    question: "What passes through the foramen ovale?",
    options: [
      'Maxillary nerve (CN V2)',
      'Mandibular nerve (CN V3)',
      'Ophthalmic nerve (CN V1)',
      'Facial nerve (CN VII)'
    ],
    correct: 1,
    explanation: 'The mandibular division of the trigeminal nerve (CN V3) passes through the foramen ovale.',
    category: 'anatomy',
    difficulty: 'medium',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'q35',
    question: "Which muscle is responsible for abduction of the arm at the shoulder?",
    options: [
      'Supraspinatus',
      'Deltoid',
      'Infraspinatus',
      'Teres minor'
    ],
    correct: 1,
    explanation: 'The deltoid muscle is the primary abductor of the arm at the shoulder joint, with the supraspinatus initiating the movement.',
    category: 'anatomy',
    difficulty: 'easy',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'q36',
    question: "Which bone forms the posterior wall of the orbit?",
    options: [
      'Frontal bone',
      'Sphenoid bone',
      'Maxilla',
      'Zygomatic bone'
    ],
    correct: 1,
    explanation: 'The sphenoid bone (greater wing) forms the posterior wall of the orbit.',
    category: 'anatomy',
    difficulty: 'medium',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'q37',
    question: "How many cervical vertebrae are there in the human spine?",
    options: [
      '5',
      '7',
      '12',
      '8'
    ],
    correct: 1,
    explanation: 'There are 7 cervical vertebrae in the human spine, labeled C1 through C7.',
    category: 'anatomy',
    difficulty: 'easy',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'q38',
    question: "Which artery supplies blood to the brain stem?",
    options: [
      'Anterior cerebral artery',
      'Vertebrobasilar system',
      'Middle cerebral artery',
      'Posterior communicating artery'
    ],
    correct: 1,
    explanation: 'The vertebrobasilar system (vertebral and basilar arteries) supplies blood to the brain stem.',
    category: 'anatomy',
    difficulty: 'medium',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'q80',
    question: "Which type of blood vessel carries oxygenated blood away from the heart?",
    options: [
      'Vein',
      'Artery',
      'Capillary',
      'Venule'
    ],
    correct: 1,
    explanation: 'Arteries are blood vessels that carry oxygen-rich blood from the heart to all other parts of the body, with the exception of the pulmonary artery.',
    category: 'anatomy',
    difficulty: 'easy',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },

  // Physiology Questions (6 questions)
  {
    id: 'q39',
    question: "What is the normal resting membrane potential of a cardiac myocyte?",
    options: [
      '-70 mV',
      '-90 mV',
      '-55 mV',
      '-40 mV'
    ],
    correct: 1,
    explanation: 'The resting membrane potential of cardiac myocytes is approximately -90 mV, which is more negative than skeletal muscle due to higher K+ permeability.',
    category: 'physiology',
    difficulty: 'medium',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'q40',
    question: "Which hormone is primarily responsible for calcium homeostasis?",
    options: [
      'Calcitonin',
      'Parathyroid hormone (PTH)',
      'Vitamin D',
      'Growth hormone'
    ],
    correct: 1,
    explanation: 'Parathyroid hormone (PTH) is the primary regulator of calcium homeostasis, increasing serum calcium through multiple mechanisms.',
    category: 'physiology',
    difficulty: 'easy',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'q41',
    question: "What is the primary site of erythropoietin production?",
    options: [
      'Bone marrow',
      'Liver',
      'Kidneys',
      'Spleen'
    ],
    correct: 2,
    explanation: 'Erythropoietin is primarily produced by the kidneys in response to hypoxia, stimulating red blood cell production in the bone marrow.',
    category: 'physiology',
    difficulty: 'easy',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'q42',
    question: "What is the normal pH range of arterial blood?",
    options: [
      '7.25-7.35',
      '7.35-7.45',
      '7.45-7.55',
      '7.30-7.40'
    ],
    correct: 1,
    explanation: 'Normal arterial blood pH is 7.35-7.45. Values below 7.35 indicate acidemia, and values above 7.45 indicate alkalemia.',
    category: 'physiology',
    difficulty: 'easy',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'q43',
    question: "Which phase of the cardiac cycle takes up the most time?",
    options: [
      'Systole',
      'Diastole',
      'Isovolumetric contraction',
      'Isovolumetric relaxation'
    ],
    correct: 1,
    explanation: 'Diastole (ventricular filling) takes up approximately 2/3 of the cardiac cycle at normal heart rates.',
    category: 'physiology',
    difficulty: 'medium',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'q44',
    question: "What is the primary driver of venous return to the heart?",
    options: [
      'Cardiac suction',
      'Pressure gradient',
      'Skeletal muscle pump',
      'Respiratory pump'
    ],
    correct: 1,
    explanation: 'The pressure gradient between peripheral venous pressure and central venous pressure is the primary driver of venous return.',
    category: 'physiology',
    difficulty: 'medium',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },

  // Immunology Questions (6 questions)
  {
    id: 'q45',
    question: "Which immunoglobulin is most abundant in serum?",
    options: [
      'IgA',
      'IgG',
      'IgM',
      'IgE'
    ],
    correct: 1,
    explanation: 'IgG is the most abundant immunoglobulin in serum, comprising about 75% of total serum immunoglobulins.',
    category: 'immunology',
    difficulty: 'easy',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'q46',
    question: "Which cells are primarily responsible for cell-mediated immunity?",
    options: [
      'B cells',
      'T cells',
      'Natural killer cells',
      'Macrophages'
    ],
    correct: 1,
    explanation: 'T cells, particularly CD8+ cytotoxic T cells and CD4+ helper T cells, are the primary mediators of cell-mediated immunity.',
    category: 'immunology',
    difficulty: 'easy',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'q47',
    question: "What is the function of complement protein C3b?",
    options: [
      'Membrane attack complex formation',
      'Opsonization',
      'Chemotaxis',
      'Anaphylatoxin activity'
    ],
    correct: 1,
    explanation: 'C3b is a major opsonin that coats pathogens and facilitates their recognition and phagocytosis by immune cells.',
    category: 'immunology',
    difficulty: 'medium',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'q48',
    question: "Which cytokine is primarily responsible for fever induction?",
    options: [
      'TNF-α',
      'IL-1β',
      'IL-6',
      'All of the above'
    ],
    correct: 3,
    explanation: 'TNF-α, IL-1β, and IL-6 are all pyrogenic cytokines that can induce fever by acting on the hypothalamus.',
    category: 'immunology',
    difficulty: 'medium',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'q49',
    question: "What type of hypersensitivity reaction is anaphylaxis?",
    options: [
      'Type I',
      'Type II',
      'Type III',
      'Type IV'
    ],
    correct: 0,
    explanation: 'Anaphylaxis is a Type I (immediate) hypersensitivity reaction mediated by IgE antibodies and mast cell degranulation.',
    category: 'immunology',
    difficulty: 'easy',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'q50',
    question: "Which organ is considered the primary lymphoid organ for T cell maturation?",
    options: [
      'Bone marrow',
      'Thymus',
      'Spleen',
      'Lymph nodes'
    ],
    correct: 1,
    explanation: 'The thymus is the primary lymphoid organ where T cells mature and undergo positive and negative selection.',
    category: 'immunology',
    difficulty: 'easy',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },

  // Neurology Questions (6 questions)
  {
    id: 'q51',
    question: "Which neurotransmitter is deficient in Parkinson disease?",
    options: [
      'Acetylcholine',
      'Dopamine',
      'Serotonin',
      'GABA'
    ],
    correct: 1,
    explanation: 'Parkinson disease is characterized by the loss of dopaminergic neurons in the substantia nigra, leading to dopamine deficiency.',
    category: 'neurology',
    difficulty: 'easy',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'q52',
    question: "What is the most common cause of subarachnoid hemorrhage?",
    options: [
      'Hypertension',
      'Ruptured aneurysm',
      'Arteriovenous malformation',
      'Trauma'
    ],
    correct: 1,
    explanation: 'Ruptured cerebral aneurysms account for approximately 85% of spontaneous subarachnoid hemorrhages.',
    category: 'neurology',
    difficulty: 'medium',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'q53',
    question: "Which cranial nerve is affected in Bell palsy?",
    options: [
      'Trigeminal nerve (CN V)',
      'Facial nerve (CN VII)',
      'Glossopharyngeal nerve (CN IX)',
      'Hypoglossal nerve (CN XII)'
    ],
    correct: 1,
    explanation: 'Bell palsy is an idiopathic facial nerve (CN VII) palsy causing unilateral facial weakness.',
    category: 'neurology',
    difficulty: 'easy',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'q54',
    question: "What is the most common type of stroke?",
    options: [
      'Hemorrhagic stroke',
      'Ischemic stroke',
      'Transient ischemic attack',
      'Subarachnoid hemorrhage'
    ],
    correct: 1,
    explanation: 'Ischemic stroke accounts for approximately 85% of all strokes, caused by blockage of blood flow to the brain.',
    category: 'neurology',
    difficulty: 'easy',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'q55',
    question: "Which area of the brain is primarily affected in Broca aphasia?",
    options: [
      'Wernicke area',
      'Broca area',
      'Angular gyrus',
      'Arcuate fasciculus'
    ],
    correct: 1,
    explanation: 'Broca aphasia results from damage to Broca area in the frontal lobe, causing difficulty with speech production.',
    category: 'neurology',
    difficulty: 'medium',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'q56',
    question: "What is the classic triad of normal pressure hydrocephalus?",
    options: [
      'Headache, nausea, vomiting',
      'Gait disturbance, urinary incontinence, dementia',
      'Tremor, rigidity, bradykinesia',
      'Aphasia, apraxia, agnosia'
    ],
    correct: 1,
    explanation: 'Normal pressure hydrocephalus presents with the classic triad of gait disturbance, urinary incontinence, and dementia.',
    category: 'neurology',
    difficulty: 'hard',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },

  // Endocrinology Questions (6 questions)
  {
    id: 'q57',
    question: "What is the most common cause of hyperthyroidism?",
    options: [
      'Toxic multinodular goiter',
      'Graves disease',
      'Thyroiditis',
      'Thyroid adenoma'
    ],
    correct: 1,
    explanation: 'Graves disease is the most common cause of hyperthyroidism, accounting for 70-80% of cases.',
    category: 'endocrinology',
    difficulty: 'easy',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'q58',
    question: "Which hormone is elevated in Cushing syndrome?",
    options: [
      'Growth hormone',
      'Cortisol',
      'Aldosterone',
      'Insulin'
    ],
    correct: 1,
    explanation: 'Cushing syndrome is characterized by chronic elevation of cortisol levels, either from endogenous overproduction or exogenous administration.',
    category: 'endocrinology',
    difficulty: 'easy',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'q59',
    question: "What is the target HbA1c level for most diabetic patients?",
    options: [
      'Less than 6%',
      'Less than 7%',
      'Less than 8%',
      'Less than 9%'
    ],
    correct: 1,
    explanation: 'The American Diabetes Association recommends an HbA1c target of less than 7% for most non-pregnant adults with diabetes.',
    category: 'endocrinology',
    difficulty: 'easy',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'q60',
    question: "Which test is used to diagnose diabetes insipidus?",
    options: [
      'Glucose tolerance test',
      'Water deprivation test',
      'Dexamethasone suppression test',
      'Thyroid function tests'
    ],
    correct: 1,
    explanation: 'The water deprivation test is used to diagnose diabetes insipidus by assessing the ability to concentrate urine.',
    category: 'endocrinology',
    difficulty: 'medium',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'q61',
    question: "What is the most common cause of primary hyperaldosteronism?",
    options: [
      'Adrenal adenoma',
      'Bilateral adrenal hyperplasia',
      'Adrenal carcinoma',
      'Ectopic ACTH syndrome'
    ],
    correct: 1,
    explanation: 'Bilateral adrenal hyperplasia is the most common cause of primary hyperaldosteronism (Conn syndrome).',
    category: 'endocrinology',
    difficulty: 'medium',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'q62',
    question: "Which hormone deficiency causes diabetes insipidus?",
    options: [
      'Insulin',
      'Antidiuretic hormone (ADH)',
      'Growth hormone',
      'Thyroid hormone'
    ],
    correct: 1,
    explanation: 'Central diabetes insipidus is caused by deficiency of antidiuretic hormone (ADH/vasopressin) from the posterior pituitary.',
    category: 'endocrinology',
    difficulty: 'easy',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },

  // Gastroenterology Questions (6 questions)
  {
    id: 'q63',
    question: "What is the most common cause of peptic ulcer disease?",
    options: [
      'NSAIDs',
      'Helicobacter pylori',
      'Stress',
      'Alcohol'
    ],
    correct: 1,
    explanation: 'Helicobacter pylori infection is the most common cause of peptic ulcer disease, followed by NSAID use.',
    category: 'gastroenterology',
    difficulty: 'easy',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'q64',
    question: "Which liver enzyme is most specific for hepatocellular injury?",
    options: [
      'ALT',
      'AST',
      'Alkaline phosphatase',
      'GGT'
    ],
    correct: 0,
    explanation: 'ALT (alanine aminotransferase) is more specific for hepatocellular injury than AST, as it is found primarily in the liver.',
    category: 'gastroenterology',
    difficulty: 'medium',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'q65',
    question: "What is the gold standard for diagnosing celiac disease?",
    options: [
      'Anti-gliadin antibodies',
      'Small bowel biopsy',
      'Anti-tissue transglutaminase antibodies',
      'HLA typing'
    ],
    correct: 1,
    explanation: 'Small bowel biopsy showing villous atrophy remains the gold standard for diagnosing celiac disease, though serology is often used for screening.',
    category: 'gastroenterology',
    difficulty: 'medium',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'q66',
    question: "Which condition is associated with the highest risk of colorectal cancer?",
    options: [
      'Ulcerative colitis',
      'Crohn disease',
      'Familial adenomatous polyposis',
      'Diverticulosis'
    ],
    correct: 2,
    explanation: 'Familial adenomatous polyposis (FAP) has nearly 100% risk of developing colorectal cancer if untreated.',
    category: 'gastroenterology',
    difficulty: 'hard',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'q67',
    question: "What is the most common cause of acute pancreatitis?",
    options: [
      'Alcohol',
      'Gallstones',
      'Medications',
      'Trauma'
    ],
    correct: 1,
    explanation: 'Gallstones are the most common cause of acute pancreatitis, followed by alcohol consumption.',
    category: 'gastroenterology',
    difficulty: 'easy',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'q68',
    question: "Which test is most sensitive for detecting pancreatic cancer?",
    options: [
      'CT scan',
      'MRI',
      'Endoscopic ultrasound',
      'PET scan'
    ],
    correct: 2,
    explanation: 'Endoscopic ultrasound (EUS) is the most sensitive imaging modality for detecting small pancreatic tumors.',
    category: 'gastroenterology',
    difficulty: 'medium',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },

  // Nephrology Questions (6 questions)
  {
    id: 'q69',
    question: "What is the most common cause of chronic kidney disease?",
    options: [
      'Hypertension',
      'Diabetes mellitus',
      'Glomerulonephritis',
      'Polycystic kidney disease'
    ],
    correct: 1,
    explanation: 'Diabetes mellitus is the leading cause of chronic kidney disease, accounting for approximately 40% of cases.',
    category: 'nephrology',
    difficulty: 'easy',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'q70',
    question: "Which electrolyte abnormality is most commonly seen in chronic kidney disease?",
    options: [
      'Hypernatremia',
      'Hyperkalemia',
      'Hypercalcemia',
      'Hypermagnesemia'
    ],
    correct: 1,
    explanation: 'Hyperkalemia is commonly seen in chronic kidney disease due to decreased potassium excretion by the kidneys.',
    category: 'nephrology',
    difficulty: 'easy',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'q71',
    question: "What is the normal glomerular filtration rate (GFR)?",
    options: [
      '60-89 mL/min/1.73m²',
      '90-120 mL/min/1.73m²',
      '30-59 mL/min/1.73m²',
      '15-29 mL/min/1.73m²'
    ],
    correct: 1,
    explanation: 'Normal GFR is 90-120 mL/min/1.73m². Values below 60 mL/min/1.73m² for 3 months or more indicate chronic kidney disease.',
    category: 'nephrology',
    difficulty: 'medium',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'q72',
    question: "Which type of kidney stone is most common?",
    options: [
      'Uric acid',
      'Calcium oxalate',
      'Struvite',
      'Cystine'
    ],
    correct: 1,
    explanation: 'Calcium oxalate stones are the most common type of kidney stones, accounting for about 80% of all stones.',
    category: 'nephrology',
    difficulty: 'easy',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'q73',
    question: "What is the most common cause of nephrotic syndrome in adults?",
    options: [
      'Minimal change disease',
      'Focal segmental glomerulosclerosis',
      'Membranous nephropathy',
      'Diabetic nephropathy'
    ],
    correct: 2,
    explanation: 'Membranous nephropathy is the most common cause of primary nephrotic syndrome in adults.',
    category: 'nephrology',
    difficulty: 'medium',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'q74',
    question: "Which medication is contraindicated in patients with severe kidney disease?",
    options: [
      'Acetaminophen',
      'Metformin',
      'Aspirin',
      'Furosemide'
    ],
    correct: 1,
    explanation: 'Metformin is contraindicated in severe kidney disease due to the risk of lactic acidosis.',
    category: 'nephrology',
    difficulty: 'medium',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },

  // General Knowledge Questions (5 questions)
  {
    id: 'q75',
    question: "Which of the following is the largest planet in our solar system?",
    options: [
      'Earth',
      'Mars',
      'Jupiter',
      'Saturn'
    ],
    correct: 2,
    explanation: 'Jupiter is the largest planet, with a diameter of about 143,000 kilometers, more than 11 times the diameter of Earth.',
    category: 'general_knowledge',
    difficulty: 'easy',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'q76',
    question: "Who is credited with inventing the World Wide Web?",
    options: [
      'Steve Jobs',
      'Bill Gates',
      'Tim Berners-Lee',
      'Vint Cerf'
    ],
    correct: 2,
    explanation: 'Tim Berners-Lee, a British scientist, invented the World Wide Web (WWW) in 1989 while working at CERN.',
    category: 'general_knowledge',
    difficulty: 'medium',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'q77',
    question: "In which country would you find the ancient city of Petra?",
    options: [
      'Egypt',
      'Greece',
      'Jordan',
      'Turkey'
    ],
    correct: 2,
    explanation: "Petra is a famous archaeological site in Jordan's southwestern desert, dating to around 300 B.C.",
    category: 'general_knowledge',
    difficulty: 'medium',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'q78',
    question: "What is the hardest known natural material?",
    options: [
      'Gold',
      'Iron',
      'Quartz',
      'Diamond'
    ],
    correct: 3,
    explanation: 'Diamond is the hardest known natural material, rating 10 on the Mohs scale of hardness.',
    category: 'general_knowledge',
    difficulty: 'easy',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'q79',
    question: "The ancient Roman legal principle 'ignorantia juris non excusat' means what in English?",
    options: [
      'Ignorance of the law excuses no one',
      'The law is ignorant of excuses',
      'Ignorance of the jury is no excuse',
      'The law does not excuse jurisdiction'
    ],
    correct: 0,
    explanation: 'The principle means that a person who is unaware of a law may not escape liability for violating that law merely because they were unaware of its content.',
    category: 'general_knowledge',
    difficulty: 'hard',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];