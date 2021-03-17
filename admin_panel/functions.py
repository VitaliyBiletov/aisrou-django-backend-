from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger


def get_name(self):
    return '{} {} {}'.format(self.last_name, self.first_name, self.middle_name)
