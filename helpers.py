from PIL import Image, ExifTags
from io import BytesIO
from django.core.files.uploadedfile import InMemoryUploadedFile
import sys

def optimise_image(photo, new_quality_value_max_100):
    # Opening the uploaded image and rotate if required
        try:
            im = Image.open(photo)
            
            for orientation in ExifTags.TAGS.keys():
                if ExifTags.TAGS[orientation] == 'Orientation':
                    break
            exif = dict(im._getexif().items())
    
            if exif[orientation] == 3:
                im = im.rotate(180, expand=True)
            elif exif[orientation] == 6:
                im = im.rotate(270, expand=True)
            elif exif[orientation] == 8:
                im = im.rotate(90, expand=True)
            im.save(photo)
        except:
            im = Image.open(photo)
        
        
        output = BytesIO()

        # Resize/modify the image
        # im = im.resize((100, 100))
        
        # after modifications, save it to the output
        im.save(output, format='JPEG', quality=new_quality_value_max_100)
        output.seek(0)
        
        # change the imagefield value to be the newley modifed image value
        new_photo = InMemoryUploadedFile(output, 'ImageField', "%s.jpg" % photo.name.split('.')[0], 'image/jpeg',
                                        sys.getsizeof(output), None)
        
        return new_photo