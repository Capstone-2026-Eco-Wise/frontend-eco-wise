import { useState, useEffect } from 'react';
import { getPublicFaQs, type FAQ } from '@/services/faqsService';

export const useFAQs = (category?: string) => {
    const [faqs, setFaqs] = useState<FAQ[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchFAQs = async() => {
            try {
                setLoading(true)
                const data = await getPublicFaQs(category)
                setFaqs(data)
            } catch (err) {
                const error = err as { response?: { data?: { message?: string } }; message?: string };
                setError(error.response?.data?.message || error.message || 'Gagal memuat FAQ')
            } finally {
                setLoading(false)
            }
        };

        fetchFAQs();
    }, [category]);

    return { faqs, loading, error }
}