import { useState, useMemo } from 'react';
import './BriefingAgent.css';
import BriefingSection from './BriefingSection';
import ProgressIndicator from './ProgressIndicator';
import CompletionStatus from './CompletionStatus';

const BRIEFING_STRUCTURE = [
  {
    id: 'context',
    title: 'Context & Achtergrond',
    required: true,
    fields: [
      { id: 'situation', label: 'Huidige situatie', type: 'textarea', required: true },
      { id: 'challenge', label: 'Uitdaging/Probleem', type: 'textarea', required: true },
      { id: 'background', label: 'Relevante geschiedenis', type: 'textarea', required: false }
    ]
  },
  {
    id: 'objective',
    title: 'Doel & Resultaat',
    required: true,
    fields: [
      { id: 'goal', label: 'Wat moet er bereikt worden?', type: 'textarea', required: true },
      { id: 'success', label: 'Hoe ziet succes eruit?', type: 'textarea', required: true },
      { id: 'kpi', label: 'Meetbare indicatoren (KPI\'s)', type: 'textarea', required: true }
    ]
  },
  {
    id: 'audience',
    title: 'Doelgroep',
    required: true,
    fields: [
      { id: 'primary', label: 'Primaire doelgroep', type: 'textarea', required: true },
      { id: 'secondary', label: 'Secundaire doelgroep', type: 'textarea', required: false },
      { id: 'insights', label: 'Belangrijke inzichten over de doelgroep', type: 'textarea', required: true }
    ]
  },
  {
    id: 'message',
    title: 'Boodschap & Tone of Voice',
    required: true,
    fields: [
      { id: 'core', label: 'Kernboodschap', type: 'textarea', required: true },
      { id: 'tone', label: 'Gewenste tone of voice', type: 'text', required: true },
      { id: 'avoid', label: 'Wat moet vermeden worden?', type: 'textarea', required: false }
    ]
  },
  {
    id: 'deliverables',
    title: 'Middelen & Deliverables',
    required: true,
    fields: [
      { id: 'channels', label: 'Kanalen/Media', type: 'textarea', required: true },
      { id: 'formats', label: 'Formats (bijv. video, banner, landingspagina)', type: 'textarea', required: true },
      { id: 'quantity', label: 'Aantal deliverables', type: 'text', required: true }
    ]
  },
  {
    id: 'timing',
    title: 'Planning & Timing',
    required: true,
    fields: [
      { id: 'deadline', label: 'Uiterste opleverdatum', type: 'date', required: true },
      { id: 'milestones', label: 'Tussentijdse mijlpalen', type: 'textarea', required: false },
      { id: 'campaign', label: 'Campagneperiode/Live datum', type: 'text', required: true }
    ]
  },
  {
    id: 'constraints',
    title: 'Randvoorwaarden & Budget',
    required: true,
    fields: [
      { id: 'budget', label: 'Beschikbaar budget', type: 'text', required: true },
      { id: 'legal', label: 'Juridische/compliance vereisten', type: 'textarea', required: false },
      { id: 'technical', label: 'Technische beperkingen', type: 'textarea', required: false }
    ]
  },
  {
    id: 'stakeholders',
    title: 'Stakeholders & Goedkeuring',
    required: true,
    fields: [
      { id: 'owner', label: 'Briefing eigenaar', type: 'text', required: true },
      { id: 'approvers', label: 'Wie moet goedkeuren?', type: 'textarea', required: true },
      { id: 'contact', label: 'Contactpersoon voor vragen', type: 'text', required: true }
    ]
  },
  {
    id: 'assets',
    title: 'Beschikbare Assets',
    required: false,
    fields: [
      { id: 'existing', label: 'Bestaande content/materiaal', type: 'textarea', required: false },
      { id: 'brand', label: 'Brand guidelines/huisstijl', type: 'textarea', required: false },
      { id: 'references', label: 'Referenties/inspiratie', type: 'textarea', required: false }
    ]
  }
];

function BriefingAgent() {
  const [briefingData, setBriefingData] = useState({});
  const [expandedSections, setExpandedSections] = useState(['context']);

  const updateField = (sectionId, fieldId, value) => {
    setBriefingData(prev => ({
      ...prev,
      [sectionId]: {
        ...prev[sectionId],
        [fieldId]: value
      }
    }));
  };

  const toggleSection = (sectionId) => {
    setExpandedSections(prev =>
      prev.includes(sectionId)
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  // Calculate section completeness
  const getSectionStatus = (section) => {
    const sectionData = briefingData[section.id] || {};
    const requiredFields = section.fields.filter(f => f.required);
    const optionalFields = section.fields.filter(f => !f.required);

    const completedRequired = requiredFields.filter(f => {
      const value = sectionData[f.id];
      return value && value.toString().trim().length > 0;
    }).length;

    const completedOptional = optionalFields.filter(f => {
      const value = sectionData[f.id];
      return value && value.toString().trim().length > 0;
    }).length;

    const totalRequired = requiredFields.length;
    const totalOptional = optionalFields.length;

    if (totalRequired === 0) {
      // Optional section
      return {
        status: totalOptional > 0 && completedOptional > 0 ? 'complete' : 'optional',
        completedRequired,
        totalRequired,
        completedOptional,
        totalOptional
      };
    }

    if (completedRequired === totalRequired) {
      return {
        status: 'complete',
        completedRequired,
        totalRequired,
        completedOptional,
        totalOptional
      };
    } else if (completedRequired > 0) {
      return {
        status: 'partial',
        completedRequired,
        totalRequired,
        completedOptional,
        totalOptional
      };
    } else {
      return {
        status: 'incomplete',
        completedRequired,
        totalRequired,
        completedOptional,
        totalOptional
      };
    }
  };

  // Calculate overall progress
  const overallStatus = useMemo(() => {
    const requiredSections = BRIEFING_STRUCTURE.filter(s => s.required);
    const completedSections = requiredSections.filter(
      s => getSectionStatus(s).status === 'complete'
    ).length;

    const percentage = Math.round((completedSections / requiredSections.length) * 100);
    const isComplete = completedSections === requiredSections.length;

    return {
      completedSections,
      totalSections: requiredSections.length,
      percentage,
      isComplete
    };
  }, [briefingData]);

  const handleSubmit = () => {
    if (overallStatus.isComplete) {
      alert('Briefing verzonden! (Dit is een prototype - geen echte verzending)');
    }
  };

  return (
    <div className="briefing-agent">
      <header className="briefing-header">
        <div className="header-content">
          <div className="header-title">
            <h1>Briefing Agent</h1>
            <span className="header-subtitle">Functionele compleetheid check</span>
          </div>
          <ProgressIndicator
            percentage={overallStatus.percentage}
            completed={overallStatus.completedSections}
            total={overallStatus.totalSections}
          />
        </div>
      </header>

      <main className="briefing-main">
        <div className="briefing-intro">
          <p>
            Vul alle verplichte secties in om zekerheid te hebben dat deze briefing
            functioneel compleet is voor verzending naar vervolgdisciplines.
          </p>
        </div>

        <div className="briefing-sections">
          {BRIEFING_STRUCTURE.map((section, index) => (
            <BriefingSection
              key={section.id}
              section={section}
              sectionNumber={index + 1}
              status={getSectionStatus(section)}
              isExpanded={expandedSections.includes(section.id)}
              onToggle={() => toggleSection(section.id)}
              data={briefingData[section.id] || {}}
              onUpdate={(fieldId, value) => updateField(section.id, fieldId, value)}
            />
          ))}
        </div>

        <CompletionStatus
          isComplete={overallStatus.isComplete}
          percentage={overallStatus.percentage}
          onSubmit={handleSubmit}
        />
      </main>
    </div>
  );
}

export default BriefingAgent;
