const fs = require('fs');
let content = fs.readFileSync('src/components/LandingPage.tsx', 'utf8');

const imports = `import React from 'react';
import { motion } from 'motion/react';
import { Skull, Activity, Target, Shield, Zap, Brain, ShieldAlert, AlertTriangle, RotateCcw } from 'lucide-react';
import { Language } from '../lib/translations';

`;
content = imports + 'export ' + content;
fs.writeFileSync('src/components/LandingPage.tsx', content);
