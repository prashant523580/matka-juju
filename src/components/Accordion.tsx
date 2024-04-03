"use client"
import * as React from 'react';
import { styled } from '@mui/material/styles';
// import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, {
    AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { MdArrowForwardIos } from 'react-icons/md';
import { site } from '@/constent';

const Accordion = styled((props: AccordionProps) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    '&:not(:last-child)': {
        borderBottom: 0,
    },
    '&::before': {
        display: 'none',
    },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
    <MuiAccordionSummary
        expandIcon={<MdArrowForwardIos sx={{ fontSize: '0.9rem' }} />}
        {...props}
    />
))(({ theme }) => ({
    backgroundColor:
        theme.palette.mode === 'dark'
            ? 'rgba(255, 255, 255, .05)'
            : 'white)',
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        transform: 'rotate(90deg)',
    },
    '& .MuiAccordionSummary-content': {
        marginLeft: theme.spacing(1),
    },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(3),
    borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

export default function CustomizedAccordions() {
    const [expanded, setExpanded] = React.useState<string | false>('panel1');

    const handleChange =
        (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
            setExpanded(newExpanded ? panel : false);
        };

    return (
        <div className=''>
            {
                site.faqs.map((faq) => (

                    <Accordion className='rounded-lg' key={faq?.id} expanded={expanded === 'panel1'+faq.id} onChange={handleChange('panel1'+faq.id)}>
                        <AccordionSummary className='font-bold px-1' aria-controls={`panel1d-content ${faq.id}`} id={"panel1d-header" +faq.id}>
                            <Typography>{faq.question} </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography  >
                                <span dangerouslySetInnerHTML={{
                                    __html: faq.answer
                                }}></span>
                             
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                ))
            }
           
        </div>
    );
}