'use client';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useSearchParams } from 'next/navigation';
import { toast } from 'sonner';

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Enter a valid email address'),
  inquiry: z.string().min(1, 'Please select an inquiry type'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type Fields = z.infer<typeof schema>;

const inquiryOptions = ['General', 'Program Enquiry', 'Court Booking', 'Membership', 'Other'];

export function ContactForm() {
  const params = useSearchParams();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<Fields>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    const plan = params.get('plan');
    const inquiry = params.get('inquiry');
    if (plan) setValue('inquiry', 'Membership');
    else if (inquiry === 'program') setValue('inquiry', 'Program Enquiry');
  }, [params, setValue]);

  function onSubmit() {
    toast.success("Message sent! We'll be in touch within 24 hours.");
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
      <div className="grid md:grid-cols-2 gap-5">
        <div className="flex flex-col gap-1.5">
          <label
            className="text-xs font-semibold uppercase tracking-wide"
            style={{ color: 'var(--color-muted)' }}
          >
            Name
          </label>
          <input
            {...register('name')}
            placeholder="Your name"
            className="px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-[#3DD68C]"
            style={{ borderColor: errors.name ? '#EF4444' : 'var(--color-border)' }}
          />
          {errors.name && (
            <span className="text-xs text-red-500">{errors.name.message}</span>
          )}
        </div>
        <div className="flex flex-col gap-1.5">
          <label
            className="text-xs font-semibold uppercase tracking-wide"
            style={{ color: 'var(--color-muted)' }}
          >
            Email
          </label>
          <input
            {...register('email')}
            type="email"
            placeholder="you@example.com"
            className="px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-[#3DD68C]"
            style={{ borderColor: errors.email ? '#EF4444' : 'var(--color-border)' }}
          />
          {errors.email && (
            <span className="text-xs text-red-500">{errors.email.message}</span>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label
          className="text-xs font-semibold uppercase tracking-wide"
          style={{ color: 'var(--color-muted)' }}
        >
          Inquiry Type
        </label>
        <select
          {...register('inquiry')}
          className="px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-[#3DD68C]"
          style={{ borderColor: errors.inquiry ? '#EF4444' : 'var(--color-border)' }}
        >
          <option value="">Select inquiry type...</option>
          {inquiryOptions.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
        {errors.inquiry && (
          <span className="text-xs text-red-500">{errors.inquiry.message}</span>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <label
          className="text-xs font-semibold uppercase tracking-wide"
          style={{ color: 'var(--color-muted)' }}
        >
          Message
        </label>
        <textarea
          {...register('message')}
          rows={5}
          placeholder="Tell us how we can help..."
          className="px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-[#3DD68C] resize-none"
          style={{ borderColor: errors.message ? '#EF4444' : 'var(--color-border)' }}
        />
        {errors.message && (
          <span className="text-xs text-red-500">{errors.message.message}</span>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="py-4 rounded-full font-semibold text-sm transition-all hover:scale-105 disabled:opacity-60"
        style={{ background: '#3DD68C', color: '#1C1C1A' }}
      >
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
}
