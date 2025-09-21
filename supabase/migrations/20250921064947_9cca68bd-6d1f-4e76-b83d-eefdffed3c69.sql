-- Insert question categories
INSERT INTO public.question_categories (name, description, icon) VALUES
('DevOps', 'General DevOps practices and tools', '🔧'),
('AWS', 'Amazon Web Services cloud platform', '☁️'),
('Docker', 'Container technology and orchestration', '🐳'),
('Kubernetes', 'Container orchestration platform', '⚡'),
('GitHub', 'Git version control and collaboration', '📝'),
('Jenkins', 'Continuous integration and deployment', '🔄'),
('Terraform', 'Infrastructure as code', '🏗️'),
('Datadog', 'Monitoring and observability', '📊')
ON CONFLICT (name) DO NOTHING;