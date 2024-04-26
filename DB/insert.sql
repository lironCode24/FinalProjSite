-- Insert Admin role
INSERT INTO public.userrole (roleid, rolename)
VALUES (1, 'Admin');

-- Insert User role
INSERT INTO public.userrole (roleid, rolename)
VALUES (2, 'User');

-- Insert 'emergency' prediction type
INSERT INTO public.predictiontype (predictionid, predictionname)
VALUES (0, 'emergency');

-- Insert 'emotional support non urgent' prediction type
INSERT INTO public.predictiontype (predictionid, predictionname)
VALUES (1, 'emotional support non urgent');

-- Insert 'emotional support urgent' prediction type
INSERT INTO public.predictiontype (predictionid, predictionname)
VALUES (2, 'emotional support urgent');

-- Insert 'legal aid non urgent' prediction type
INSERT INTO public.predictiontype (predictionid, predictionname)
VALUES (3, 'legal aid non urgent');

-- Insert 'legal aid urgent' prediction type
INSERT INTO public.predictiontype (predictionid, predictionname)
VALUES (4, 'legal aid urgent');
